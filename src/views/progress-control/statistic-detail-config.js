export const option = {
  toolbox: {
    show: true,
    feature: {
      magicType: { type: ['line', 'bar'] },
    }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    offset: -10
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    label: {
      show: true,
      position: 'top'
    },
    type: 'bar'
  }]
}
