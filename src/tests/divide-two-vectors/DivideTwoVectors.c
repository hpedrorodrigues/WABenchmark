void divideTwoVectors(double *a, double *b, double *c, int n) {
  for (int i = 0; i < n; i++) {
    c[i] = a[i] / b[i];
  }
}