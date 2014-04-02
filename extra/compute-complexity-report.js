var rep = require('../reports/complexity-report.json');

console.log('\n\tBackend metrics:');
computeMetrics(rep);

rep = require('../scaffold/reports/complexity-report.json');

console.log('\n\tFrontend metrics:');
computeMetrics(rep);


function computeMetrics (rep) {
   
    var num_params_of_methods = 0,
        difficulty = 0,
        volume = 0,
        effort = 0,
        num_fun = 0,
        ciclomatic_complexity = 0,
        max_num_params_of_methods = Number.MIN_VALUE,
        max_num_params_of_methods_fun_name,
        max_difficulty = Number.MIN_VALUE,
        max_difficulty_fun_name,
        max_volume = Number.MIN_VALUE,
        max_volume_fun_name,
        max_effort = Number.MIN_VALUE,
        max_effort_fun_name,
        max_ciclomatic_complexity = Number.MIN_VALUE,
        max_ciclomatic_complexity_fun_name;


    for (var i = 0; i < rep.reports.length; i++) {
        for (var j = 0; j < rep.reports[i].functions.length; j++) {
            num_params_of_methods += rep.reports[i].functions[j].params;
            difficulty += rep.reports[i].functions[j].halstead.difficulty;
            volume += rep.reports[i].functions[j].halstead.volume;
            effort += rep.reports[i].functions[j].halstead.effort;
            ciclomatic_complexity += rep.reports[i].functions[j].cyclomatic;
            num_fun++;

            if (rep.reports[i].functions[j].params > max_num_params_of_methods) {
                max_num_params_of_methods = rep.reports[i].functions[j].params;
                max_num_params_of_methods_fun_name = rep.reports[i].functions[j].name;
            }
            
            if (rep.reports[i].functions[j].halstead.difficulty > max_difficulty) {
                max_difficulty = rep.reports[i].functions[j].halstead.difficulty;
                max_difficulty_fun_name = rep.reports[i].functions[j].name;
            }

            if (rep.reports[i].functions[j].halstead.volume > max_volume) {
                max_volume = rep.reports[i].functions[j].halstead.volume;
                max_volume_fun_name = rep.reports[i].functions[j].name;

            }

            if (rep.reports[i].functions[j].halstead.effort > max_effort) {
                max_effort = rep.reports[i].functions[j].halstead.effort;
                max_effort_fun_name = rep.reports[i].functions[j].name;
            }

            if (rep.reports[i].functions[j].cyclomatic > max_ciclomatic_complexity) {
                max_ciclomatic_complexity = rep.reports[i].functions[j].cyclomatic;
                max_ciclomatic_complexity_fun_name = rep.reports[i].functions[j].name;
            }
        };
    };

    var avg_num_params_of_methods = num_params_of_methods / num_fun;
        avg_difficulty = difficulty / num_fun,
        avg_volume = volume / num_fun,
        avg_effort = effort / num_fun,
        avg_ciclomatic_complexity = ciclomatic_complexity / num_fun;

    console.log('Number of methods: ' + num_fun);
    console.log('Avg numbers of params per method: ' + avg_num_params_of_methods);
    console.log('Max numbers of params per method: ' + max_num_params_of_methods + ' in ' + max_num_params_of_methods_fun_name);
    console.log('Avg Halsted difficulty: ' + avg_difficulty);
    console.log('Max Halsted difficulty: ' + max_difficulty + ' in ' + max_difficulty_fun_name);
    console.log('Avg Halsted volume: ' + avg_volume);
    console.log('Max Halsted volume: ' + max_volume + ' in ' + max_volume_fun_name);
    console.log('Avg Halsted effort: ' + avg_effort);
    console.log('Max Halsted effort: ' + max_effort + ' in ' + max_effort_fun_name);
    console.log('Avg ciclomatic complexity: ' + avg_ciclomatic_complexity);
    console.log('Max ciclomatic complexity: ' + max_ciclomatic_complexity + ' in ' + max_ciclomatic_complexity_fun_name);

}