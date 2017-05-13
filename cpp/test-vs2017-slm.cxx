//cl /experimental:module /EHsc /MD /std:c++latest test-vs2017-slm.cxx

import std.core; 
  
int main() { 
    using namespace std; 
    vector<string> v { "Plato", "Descartes", "Bacon" }; 
    copy(v.begin(), v.end(), ostream_iterator<string>(cout, "\n")); 
}
