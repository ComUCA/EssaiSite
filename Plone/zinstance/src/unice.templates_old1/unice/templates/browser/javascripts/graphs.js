// CODES COULEURS
// rouge = ['#ED5565', '#DA4453'];
// orange = ['#FC6E51', '#E9573F'];
// jaune = ['#FFCE54', '#F6BB42'];
// vert_clair = ['#A0D468', '#8CC152'];
// vert_fonce = ['#48CFAD', '#37BC9B'];
// blue_clair = ['#4FC1E9', '#3BAFDA'];
// blue_fonce = ['#5D9CEC', '#4A89DC'];
// violet = ['#AC92EC', '#967ADC'];
// rose = ['#EC87C0', '#D770AD'];
// gris_clair = ['#F5F7FA', '#E6E9ED'];
// gris_medium = ['#CCD1D9', '#AAB2BD'];
// gris_fonce = ['#656D78', '#434A54'];


// PARAMETRES PAR DEFAUT
Chart.defaults.global.responsive = true;
Chart.defaults.global.tooltipTemplate = '<%if (label){%><%=label%> : <%}%><%= value %>';

Chart.defaults.Doughnut.animationEasing = 'ease';
Chart.defaults.Doughnut.animationSteps = 50;
Chart.defaults.Doughnut.segmentShowStroke = false;
Chart.defaults.Doughnut.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend list-inline text-center\"><% for (var i=0; i<segments.length; i++){%><li><i class=\"fa fa-circle\" style=\"color:<%=segments[i].fillColor%>\"></i> <%if(segments[i].label){%><small><%=segments[i].label%></small><%}%></li><%}%></ul>";

Chart.defaults.Line.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend list-inline text-center\"><% for (var i=0; i<datasets.length; i++){%><li><i class=\"fa fa-circle\" style=\"color:<%=datasets[i].strokeColor%>\"></i> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

var GRAPHS = [];

function Graph(type, canvasid, data, options) {
    GRAPHS.push(this);

    this.type = type;
    this.canvasid = canvasid;
    this.data = data;
    this.options = options;

    this.canvas = $(canvasid);
    this.initialized = false;


    this.initialize = function() {
        var chart = new Chart(this.canvas.get(0).getContext('2d'));
        switch (this.type) {
            case 'Bar':
               this.chart = chart.Bar(this.data); break;
            case 'Doughnut':
               this.chart = chart.Doughnut(this.data); break;
            case 'Line':
               this.chart = chart.Line(this.data); break;
            case 'Pie':
               this.chart = chart.Pie(this.data); break;
            case 'PolarArea':
               this.chart = chart.PolarArea(this.data); break;
            case 'Radar':
               this.chart = chart.Radar(this.data); break;
        }
        $(this.chart.generateLegend()).insertAfter(this.canvas);
        this.initialized = true;
    }

    this.isIntoView = function() {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = this.canvas.offset().top;
        var elemBottom = elemTop + this.canvas.height();
        return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    }
}

$(window).scroll(function() {
    $.each(GRAPHS, function(i, g) {
        if (!g.initialized && g.isIntoView()) {
            g.initialize();
        }
    });
});
