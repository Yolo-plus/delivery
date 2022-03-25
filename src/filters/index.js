import Vue from 'vue'

Vue.filter('date2time', function (val, format="YYYY-MM-DD hh:mm:ss") {
  return moment(val).format(format)
})