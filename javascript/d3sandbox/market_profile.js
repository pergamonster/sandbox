//TODO add lorna package.json tests using korma integrate to openfin

// create some random financial data
const generator = fc.randomFinancial()
  .interval(d3.timeMinute)
const timeSeries = generator(12 * 8);

// determine the price range
const extent = fc.extentLinear()
  .accessors([d => d.high, d => d.low]);
const priceRange = extent(timeSeries);

// use a d3 scale to create a set of price buckets
const priceScale = d3.scaleLinear()
  .domain(priceRange);
const priceBuckets = priceScale.ticks(40);

const createMarketProfile = (data, priceBuckets) => {
  // find the price bucket size
  const priceStep = priceBuckets[1] - priceBuckets[0];

  // determine whether a datapoint is within a bucket
  const inBucket = (datum, priceBucket) =>
    datum.low < priceBucket && datum.high > (priceBucket - priceStep);

  // the volume contribution for this range
  const volumeInBucket = (datum, priceBucket) =>
    inBucket(datum, priceBucket) ? datum.volume / Math.ceil((datum.high - datum.low) / priceStep) : 0;

  // map each point in our time series, to construct the market profile
  const marketProfile = data.map(
    (datum, index) => priceBuckets.map(priceBucket => {
      // determine how many points to the left are also within this time bucket
      const base = d3.sum(data.slice(0, index)
                    .map(d => volumeInBucket(d, priceBucket)));
      return {
        base,
        value: base + volumeInBucket(datum, priceBucket),
        price: priceBucket
      };
    })
  );

  // similar to d3-stack - cache the underlying data
  marketProfile.data = data;
  return marketProfile;
};

const seriesMarketProfile = () => {
  let xScale, yScale;
  let bandwidth = 20;
  const join = fc.dataJoin('g', 'profile');
  
  const barSeries = fc.autoBandwidth(fc.seriesSvgBar())
    .orient('horizontal')
    .crossValue(d => d.price)
    .mainValue(d => d.value)
    .baseValue(d => d.base);

  const colorScale = d3.scaleSequential(d3.interpolateSpectral);

  const repeatSeries = fc.seriesSvgRepeat()
    .series(barSeries)
    .orient('horizontal')
    .decorate((selection) => {
      selection.enter()
        .each((data, index, group) => {
          d3.select(group[index])
            .selectAll('g.bar')
            .attr('fill', () => colorScale(index));
        });
    });

  const series = (selection) => {
    selection.each((data, index, group) => {

      const xDomain = d3.extent(_.flattenDeep(data).map(d => d.value));
      colorScale.domain([0, data.length]);
      
      join(d3.select(group[index]), data)
        .each((marketProfile, index, group) => {

          // create a composite scale that applies the required offset
          const leftEdge = xScale(marketProfile.data[0].date);
          const offset = d3.scaleLinear()
              .domain(xDomain)
              .range([leftEdge, leftEdge + bandwidth]);

          repeatSeries.yScale(yScale)
              .xScale(offset);

          d3.select(group[index])
            .call(repeatSeries);
        });
    })
  };

  series.xScale = (...args) => {
    if (!args.length) {
      return xScale;
    }
    xScale = args[0];
    return series;
  };

  series.bandwidth = (...args) => {
    if (!args.length) {
      return bandwidth;
    }
    bandwidth = args[0];
    return series;
  };

  series.yScale = (...args) => {
    if (!args.length) {
      return yScale;
    }
    yScale = args[0];
    return series;
  };

  return series;
}

const pointOfControl = (marketProfile) => 
  _.maxBy(_.flatten(marketProfile), d => d.value).price;

const series = _.chunk(timeSeries, 12)
  .map((data) => createMarketProfile(data, priceBuckets));

//const marketProfileSeries = fc.autoBandwidth(seriesMarketProfile());

const pocSeries = fc.autoBandwidth(fc.seriesSvgErrorBar())
  .crossValue(d => d.date)
  .lowValue(d => d.value)
  .highValue(d => d.value)
  .align('left');

const multiSeries = fc.seriesSvgMulti()
  .series([pocSeries])
  .mapping((data, index, series) => {
    console.log( series, index);
    switch(series[index]) {
      case pocSeries:
        return data.map(d => ({
          date: d.data[0].date,
          value: pointOfControl(d)
        }));
      //case marketProfileSeries:
        //return data;
    }
  });

const xExtent = fc.extentDate()
  .accessors([d => d.data[0].date]);

const profileChart = fc.chartSvgCartesian(
    d3.scaleBand(),
    d3.scaleBand()
  )
  .xDomain(series.map(s => s.data[0].date))
  .yDomain(priceBuckets)
  .yTickValues(priceBuckets.filter((d, i) => i % 4 == 0))
  .xTickFormat(d3.timeFormat('%H:%M'))
  .yOrient('left')
  .xPadding(0.3)
  .plotArea(multiSeries);

d3.select('#market_profile')
  .datum(series)
  .call(profileChart);