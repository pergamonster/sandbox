//#include <boost/scoped_ptr.hpp>
//#include <iostream>
//
//int main()
//{
//
//    //Because boost::shared_ptr can share ownership, the smart pointer can be copied, which isn’t possible with boost::scoped_ptr.
//    //can share ownership == can be copied
//    /*boost::scoped_ptr<int> p{ new int{ 1 } };
//    std::cout << *p << '\n';
//    p.reset(new int{ 2 });
//    std::cout << *p.get() << '\n';
//    p.reset();
//    std::cout << std::boolalpha << static_cast<bool>(p) << '\n';*/
//
//}
#include <boost/shared_ptr.hpp>
#include <boost/weak_ptr.hpp>
#include <thread>
#include <functional>
#include <random>
#include <iostream>
#include <fstream>
#include <iomanip>
#include <vector>
#include <valarray>
#include <tuple>
#include <string>
#include <cstdlib>
#include <cmath>

const int HRANK_1000 = 1000;
const int HRANK_10000 = 10000;
const int HRANK_100000 = 100000;

using std::endl;
using std::getline;
using std::getchar;
using std::cin;
using std::cout;
using std::cerr;
using std::max;
using std::abs;
using std::tie;
using std::begin;
using std::end;
using std::string;
using std::vector;
using namespace std::placeholders;

std::tuple<int, string> multiRet(bool flag) {
    return std::make_tuple( 1,"test" );
}

void reset(boost::shared_ptr<int> &sh)
{
    sh.reset();
}

void print(boost::weak_ptr<int> &w)
{
    boost::shared_ptr<int> sh = w.lock();
    if (sh)
        std::cout << *sh << '\n';
}

auto func0()
{
    return 0;
}

static_assert(std::is_same<decltype(func0()), int>(), "");

void experiment() {
    int ia[] = { 0,1,2,3,4,5,6,7,8,9 };
    // pbeg points to the first and pend points just past the last element in arr
    int *pbeg = begin(ia), *pend = end(ia);
    // find the first negative element, stopping if we've seen all the elements
    while (pbeg != end(ia) && *pbeg >= 0) {
        cout << *pbeg << endl;
        ++pbeg;
        
        
    };
}

std::ifstream getFile(const string& filename) {
    std::ifstream file;
    file.open(filename);
    
    if (!file.is_open()) {
        cerr << "Error opening file: "
             << filename
             << ".  Aborting..."
             << endl;
    }
    return file;
}
void coolBind() {
    // common use case: binding a RNG with a distribution
    std::default_random_engine e;
    std::uniform_int_distribution<> d(0, 10);
    auto rnd = std::bind(d, e); // a copy of e is stored in rnd
    for (int n = 0; n < 10; ++n)
        std::cout << rnd() << ' ';
    std::cout << '\n';
}
void readNLines(const string& filename, const int& N) {
    
    int lines = 0;
    std::unique_ptr<string[]> output(new string[N]);
    auto file = getFile(filename);
    while (file.good()) {
        getline(file, output[lines % N]);
        ++lines;
    }
    int start, count;
    if (lines < N) {
        start = 0;
        count = lines;
    }
    else {
        start = lines % N;
        count = N;
    }
    for (int i = 0; i < count; ++i) {
        cout << output[(start + i) % N] << endl;
    }
}
bool isAnagram(char* s1, char* s2) {
    std::valarray<int> count(255);
    int i;

    for (i = 0; s1[i] && s2[i]; i++) {
        count[s1[i]]++;
        count[s2[i]]--;
    }

    if (s1[i] || s2[i]) return false;
    return !count.sum();
}
void reverseArray(int arr[], int start, int end) {
    while (start < end) {

        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}
/* Utility function to print an array */
void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";

    cout << endl;
}


int main(const int argc, const char **argv)
{
    boost::shared_ptr<int> sh{ new int{ 99 } };
    boost::weak_ptr<int> w{ sh };
    std::thread t1{ reset, std::ref(sh) };
    std::thread t2{ print, std::ref(w) };
    t1.join();
    t2.join();
    const string s = "input.txt";
    string line;
    int lineCount = 0;
    auto file = getFile(s);

    experiment();
    
    while (file.good()) {
        std::getline(file, line);
        cout << ++lineCount
            << ": "
            << line
            << endl;
    }
    readNLines(s, 2);
    file.close();
    coolBind();
    cout << isAnagram("goats", "togggga")<<endl;
    int num; string sth;
    tie(num, sth) = multiRet(true);

    int arr[] = { 1, 2, 3, 4, 5, 6 };

    // To print original array 
    printArray(arr, 6);

    // Function calling 
    reverseArray(arr, 0, 5);

    cout << "Reversed array is" << endl;

    // To print the Reversed array 
    printArray(arr, 6);
    std::valarray<int> count(3);
    int inputs[HRANK_1000];
    int N;
    cout << "Enter array size: ";
    cin >> N;
    cout << "Enter numbers separated by a space: ";
    
    for (int i = 0; i < N; i++)
    {
        cin >> inputs[i];
        cout << inputs[i] << " has been added to the list" << endl;
    }
}

