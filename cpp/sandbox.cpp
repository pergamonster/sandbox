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
#include <iostream>

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

int main()
{
    boost::shared_ptr<int> sh{ new int{ 99 } };
    boost::weak_ptr<int> w{ sh };
    std::thread t1{ reset, std::ref(sh) };
    std::thread t2{ print, std::ref(w) };
    t1.join();
    t2.join();
}
