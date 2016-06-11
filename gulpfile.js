var elixir = require('laravel-elixir');
var bowerDir = 'vendor/bower_components/';
var paths = {
	bootstrap:'node_modules/bootstrap-sass/assets/'
}

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss')
    	.copy(paths.bootstrap + 'fonts/**', 'public/fonts')
    	.scripts([
    		bowerDir + 'angular/angular.js',
    		bowerDir + 'angular-bootstrap/ui-bootstrap-tpls.js',
    		bowerDir + 'angular-resource/angular-resource.js',
    		bowerDir + 'moment/moment.js'
    	], 'public/scripts/vendor.js','./');

});


/*
<script src="bower_components/angular/angular.js" charset="utf-8"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js" charset="utf-8"></script>
    <script src="bower_components/angular-resource/angular-resource.js" charset="utf-8"></script>
    <script src="bower_components/moment/moment.js" charset="utf-8"></script>
 */