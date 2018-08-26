//"postinstall": "cd node_modules/BitFlux && npm i && grunt build:module",
{ test: /\.json$/, use: ['json-loader'] }
"postinstall": "cd node_modules/BitFlux && npm i && grunt build:module",	
"postinstall": "cd node_modules/BitFlux && npm i && grunt build:module",
@import "../../components/version/version.less";

@import "../../containers/sidebars/closedWindows/closedCard.less";
@import "../../containers/sidebars/closedWindows/closedWindowList.less";

@import "../../containers/toolbar/toolbar.less";
@import "../../containers/toolbar/toolbar-mixins.less";
@import "../../containers/sidebars/sidebar.less";
@import "../../containers/sidebars/search/search.less";
@import "../../containers/sidebars/favourites/favourites.less";

@import "../../components/minichart/minichart.less";
@import "../../components/favourite/unfavourite-confirmation.less";
@import "../../containers/showcase/showcase-changes.less";
@import "../../containers/sidebars/custom-scroll.less";

// Compact styles
@import "../../containers/main/main-compact.less";
@import "../../containers/toolbar/toolbar-compact.less";
@import "../../components/favourite/unfavourite-confirmation-compact.less";
@import "../../containers/sidebars/favourites/favourite-compact.less";
@import "../../containers/sidebars/sidebar-compact.less";
@import "../../containers/sidebars/search/search-compact.less";
/*
@import "../../closedWindows/closedWindowList/closedWindowList-compact.less";
*/