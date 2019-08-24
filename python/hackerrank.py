from itertools import product

K,M = map(int,input().split())
N = (list(map(int, input().split()))[1:] for _ in range(K))
results = map(lambda x: sum(i**2 for i in x)%M, product(*N))
print(max(results))

regex_integer_in_range = r"^[1-9][\d]{5}$"	# Do not delete 'r'.
regex_alternating_repetitive_digit_pair = r"(\d)(?=\d\1)"	# Do not delete 'r'.


import re
P = input()

print (bool(re.match(regex_integer_in_range, P)) 
and len(re.findall(regex_alternating_repetitive_digit_pair, P)) < 2)

#http://blog.reverberate.org/2013/07/ll-and-lr-parsing-demystified.html

ops={
  "+": (lambda a, b: a + b),
  "-": (lambda a, b: a - b),
  "*": (lambda a, b: a * b),
  "/": (lambda a, b: a / b)
}

def eval(expression):
  tokens = expression.split()
  stack = []

  for token in tokens:
    if token in ops:
      arg2 = stack.pop()
      arg1 = stack.pop()
      result = ops[token](arg1, arg2)
      stack.append(result)
    else:
      stack.append(int(token))

  return stack.pop()
  
print(eval("1 2 + "))

def treecut(A):
    removed = 0

    for i in range(1, len(A)-1):
        if A[i-1] > A[i]:
            if removed:
                return 0
            if i == 1 or A[i-2] <= A[i]:
                removed += 1
            if i == len(A) - 1 or A[i-1] <= A[i+1]:
                removed += 1
            if removed == 0:
                return 0
    return removed or len(A)