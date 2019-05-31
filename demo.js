// var data = [0, 0, 21, 18, 17, 18]
    var sample = [
      {
        year: 'September 1996',
        value: 0,
        color: '#000000'
      },
      {
        year: 'October 2009',
        value: 0,
        color: '#00a2ee'
      },
      {
        year: 'May 2012',
        value: 21,
        color: '#fbcb39'
      },
      {
        year: 'June 2012',
        value: 18,
        color: '#007bc8'
      },
      {
        year: 'January 2015',
        value: 17,
        color: '#65cedb'
      },
      {
        year: 'September 2015',
        value: 18,
        color: '#ff6e52'
      },

    ];

    var svg = d3.select('svg');
    var svgContainer = d3.select('#container');

    var margin = 80;
    var barWidth = 1000 - 2 * margin;
    var barHeight = 500 - 2 * margin;

    var chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    var xScale = d3.scaleBand()
      .range([0, barWidth])
      .domain(sample.map((s) => s.year))
      .padding(0.4)

    var yScale = d3.scaleLinear()
      .range([barHeight, 0])
      .domain([0, 40]);

    var makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${barHeight})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-barWidth, 0, 0)
        .tickFormat('')
      )

    var barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.year))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => barHeight - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.year) - 5)
          .attr('width', xScale.bandwidth() + 10)

        var y = yScale(actual.value)

        line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', barWidth)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.year) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            var divergence = (a.value - actual.value).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.year))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.year) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}`)

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(barHeight / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Total Seats in Parliament')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', barWidth / 2 + margin)
      .attr('y', barHeight + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Election Years')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', barWidth / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Seats Gained in Greek Parliament')
