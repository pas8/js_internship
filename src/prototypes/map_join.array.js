Array.prototype.map_join = function (func,as='') {
  return this.map(func).join(as);
};
