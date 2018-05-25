divCharts = {};

divCharts.title = `
		<div class="heading" style="text-align:center; height:10%;">
			<h3>
				%s
			</h3>
		</div>
	`;

divCharts.verticalChartTemplate = `
		%s
		%s
	`;

divCharts.horizontalXAxisTick = `
		<div class="first-tick" style="float:left; width:%s%;">
			<div class="label" style="transform:translateX(-50%); display:inline-block;">
				%s
			</div>
		</div>
	`;
divCharts.horizontalXAxisHeadTick = `
		<div class="head-tick">
			<div class="label" style="transform:translateX(-50%); display:inline-block;">
				%s
			</div>
		</div>
	`;
divCharts.horizontalXAxisLastTick = `
		<div class="last-tick" style="float:right; width:0%; text-align:right;">
			<div class="label" style="transform:translateX(-50%); display:inline-block;">
				%s
			</div>
		</div>
	`;

divCharts.horizontalXAxis = `
		<div class="x-axis" style="margin:0 0 0 10%; height:10%; width:80%;">
			<div class="ticks" style="width:100%; height:100%;">
				%s
			</div>
		</div>
	`;

divCharts.horizontalYAxisTick = `
		<div class="label-container" style="max-height:100%; padding:5px;">
			<div class="label" style="">%s</div>
		</div>
	`;

divCharts.horizontalYAxis = `
		<div class="y-axis" style="height:100%; width:10%; float:left;">
			<div class="ticks" style="position:relative; max-height:100%; text-align:right;">
				%s
			</div>
		</div>
	`;

divCharts.horizontalBarTemplate = `
		<div class="bar" style="width:%s%; background-color:red; max-height:100%; max-width:100%; box-shadow: 1px 2px 3px #888888;">
			<div class="value-container" style="text-align:right; max-height:100%; padding:5px;">
				<div class="value" style="transform:translateX(0%); display:inline-block;">%s</div>
			</div>
		</div>
	`;

divCharts.horizontalBarsTemplate = `
		<div class="bars" style="height:80%; width:80%; margin:0 0 0 10%;">
			<div class="bars-container" style="position:relative; max-height:100%;">
				%s
			</div>
		</div>
	`;

divCharts.horizontalChartTemplate = `
		%s
		%s
		%s
		%s
	`;

divCharts.createHBC = function(definition) {
	let title = _sprintf(divCharts.title, definition.title);
	let yAxis = _getHorizontalYAxis(definition);
	let bars = _getHorizontalBars(definition);
	let xAxis = _getHorizontalXAxis(definition);
	document.getElementById(definition.id).innerHTML = _sprintf(divCharts.horizontalChartTemplate,title,yAxis,bars,xAxis);
}

divCharts.createVBC = function(definition) {
	// let title = _sprintf(divCharts.title, definition.title);
	// let yAxis = _getVerticalYAxis(definition);
	// let bars = _getVerticalBars(definition);
	// let xAxis = _getVerticalXAxis(definition);
	// document.getElementById(definition.id).innerHTML = _sprintf(divCharts.verticalChartTemplate,title,yAxis,bars,xAxis);
}

function _getHorizontalYAxis(definition) {
	let ticksArray = [];
	for (let i=0; i<definition.data.length; i++) {
		let set = definition.data[i];
		let j=0;
		for (let key in set) {
			if (ticksArray.length <= j) {
				ticksArray.push('');
			}
			ticksArray[j] += _sprintf(divCharts.horizontalYAxisTick, key);
			j++;
		}
	}
	let ticks = '';
	for (let i=0; i<ticksArray.length; i++) {
		if (i==0) {
			ticks += '<br />'
		}
		ticks += ticksArray[i] + '<br />';
	}
	return _sprintf(divCharts.horizontalYAxis, ticks);
}

function _getHorizontalBars(definition) {
	let barsArray = [];
	for (let i=0; i<definition.data.length; i++) {
		let set = definition.data[i];
		let j=0;
		for (let key in set) {
			if (barsArray.length <= j) {
				barsArray.push('');
			}
			let value = set[key];
			let size = value / definition.xAxis.max * 100;
			barsArray[j] += _sprintf(divCharts.horizontalBarTemplate, size, value);
			j++;
		}
	}
	let bars = '';
	for (let i=0; i<barsArray.length; i++) {
		if (i==0) {
			bars += '<hr />'
		}
		bars += barsArray[i] + '<hr />';
	}
	return _sprintf(divCharts.horizontalBarsTemplate, bars);	
}

function _getHorizontalXAxis(definition) {
	let ticks = '';
	let size = 100 / (definition.xAxis.max / definition.xAxis.step);
	for (let i=definition.xAxis.min; i<=definition.xAxis.max; i=(i+definition.xAxis.step)) {
		if (i+definition.xAxis.step > definition.xAxis.max) {
			ticks = _sprintf(divCharts.horizontalXAxisLastTick, definition.xAxis.max) + ticks;
		} else if (i+definition.xAxis.step+definition.xAxis.step > definition.xAxis.max) {
			ticks += _sprintf(divCharts.horizontalXAxisHeadTick, i);
		} else {
			ticks += _sprintf(divCharts.horizontalXAxisTick, size, i);
		}
	}
	return _sprintf(divCharts.horizontalXAxis, ticks);
}

function _sprintf(str) {
    var args = arguments, i = 1;

    return str.replace(/%(s|d|0\d+d)/g, function (x, type) {
        var value = args[i++];
        switch (type) {
        case 's': return value;
        case 'd': return parseInt(value, 10);
        default:
            value = String(parseInt(value, 10));
            var n = Number(type.slice(1, -1));
            return '0'.repeat(n).slice(value.length) + value;
        }
    });
}