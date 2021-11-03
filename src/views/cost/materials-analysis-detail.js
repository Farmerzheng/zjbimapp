export const accOption = {
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
  }, {
    data: [120, 200, 150, 80, 70, 110, 130],
    label: {
      show: true,
      position: 'top'
    },
    type: 'bar'
  }]
}

export const monOption = {
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
    data: [150, 230, 224, 218, 135, 147, 260],
    label: {
      show: true,
      position: 'top'
    },
    type: 'bar'
  }, {
    data: [150, 230, 224, 218, 135, 147, 260],
    label: {
      show: true,
      position: 'top'
    },
    type: 'bar'
  }]
}
