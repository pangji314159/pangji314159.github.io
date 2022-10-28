"use strict";

var canvas;
var gl;
//var nLoc;
var theta = 0.0;
var thetaLoc;
var n = 9.0;
var vertices = [];
var speed;
var direction=1;
function changeDir(){
	direction *= -1;
}

window.onload=function init(){
	speed=document.getElementById("speed").value;
    initAngles();
	document.getElementById( "speed" ).onchange = function( event ){
		speed = event.target.value;
	}
	rander();
}	


function initAngles(){
    var step = 360 / n;

    for( var i = 0; i < n; i++ ){
        vertices.push( step * i );
    }

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    thetaLoc = gl.getUniformLocation( program, "theta" );
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    var aAngle = gl.getAttribLocation( program, "aAngle" );
	gl.vertexAttribPointer( aAngle, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aAngle );

    return n;
}

function rander(){
	var x=100-speed;
	gl.clear( gl.COLOR_BUFFER_BIT );
	theta += direction * 0.1;
	gl.uniform1f( thetaLoc, theta );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, n );
	//requestAnimationFrame( rander );
	setTimeout( function(){ requestAnimFrame( rander ); }, x );
}
