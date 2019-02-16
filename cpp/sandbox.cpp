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
#include <vector>
#include <string>
#include <cstdlib>

using std::endl;
using std::cin;
using std::cout;
using std::cerr;
using std::string;
using std::vector;
using namespace std::placeholders;


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
}
