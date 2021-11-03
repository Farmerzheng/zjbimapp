
const level = {
  title: {
    text: '问题等级',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['特大', '重大', '严重', '一般', '继续保持']
  },
  series: [
    {
      name: '问题等级',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 1, name: '特大' },
        { value: 1, name: '重大' },
        { value: 1, name: '严重' },
        { value: 1, name: '一般' },
        { value: 1, name: '继续保持' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const profession = {

  title: {
    text: '专业分类',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['文明施工', '安全防护', '施工安全']
  },
  series: [
    {
      name: '状态分布',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1, name: '文明施工' },
        { value: 1, name: '安全防护' },
        { value: 1, name: '施工安全' }
      ]
    }
  ]
}

const status = {
  title: {
    text: '状态分布',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['请整改', '整改完成', '验收完成', '重新整改', '拒绝整改']
  },
  series: [
    {
      name: '状态分布',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 1, name: '请整改' },
        { value: 1, name: '整改完成' },
        { value: 1, name: '验收完成' },
        { value: 1, name: '重新整改' },
        { value: 1, name: '拒绝整改' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

export const monthly = {

  title: {
    text: '月度分布',
    subtext: '数量'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['安全问题']
  },
  toolbox: {
    show: true,
    feature: {
      // dataZoom: {
      //   yAxisIndex: 'none'
      // },
      // dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      // restore: {},
      // saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['2019-10', '2019-12', '2020-02', '2020-04', '2020-05']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 个'
    }
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 1000
  }, {
    start: 0,
    end: 10,
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  }],
  series: [
    {
      name: '安全问题',
      type: 'bar',
      data: [1, 5, 9, 7, 4],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }
  ]
}

export default {
  level,
  profession,
  status,
  monthly
}

