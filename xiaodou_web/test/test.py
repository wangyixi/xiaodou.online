a = 'abce'
print(type(a))
b = a.decode("ascii")
print(type(b))
c = a.decode("ascii").encode("utf-8")
print(type(c))
