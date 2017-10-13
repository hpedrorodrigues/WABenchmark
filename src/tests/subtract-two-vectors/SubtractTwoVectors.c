void subtractTwoVectors(int *a, int *b, int *c, int n) {
  for (register int i = 0; i < n; i++) {
    c[i] = a[i] - b[i];
  }
}