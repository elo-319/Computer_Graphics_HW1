onload = () => {
    // we get the id of canvas from html
    let canvas = document.getElementById('webgl-canvas');
    // sets up webgl
    let gl = WebGLUtils.setupWebGL(canvas);
    // it checks is webgl works or not
    if (!gl) { 
        alert("Couldn't setup WebGL"); 
        return; 
    }
    // we can use shaders in program
    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // we are clearing color of the canvas
    gl.clearColor(0, 0, 0, 1);
    // we are clearing color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);
    // we create var rend_mod here: 'TRIANGLE_STRIP' or 'TRIANGLE_FAN'
    // you can change the TRIANGLE_STRIP to TRIANGLE_FAN or vise verse.
    let render = 'TRIANGLE_STRIP'; 

    if (render === 'TRIANGLE_STRIP') {
        // cordinates of vertices of figure in arrays
        let vertices = [
            -0.5, -0.5,
            -0.5, 0.5,
            0.5, -0.5,
            0.5, 0.5
        ];
        //we create a buffer for figure
        let vBuffer = gl.createBuffer();
        //every time we use buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        // we add data to our buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // attribute location for the vertex position
        let vPosition = gl.getAttribLocation(program, 'vPosition');
        // how the vertex shader interprets the data
        gl.vertexAttribPointer(
            vPosition,
            2,
            gl.FLOAT,
            gl.FALSE,
            0,
            0
        );
        //  the vertex position attribute
        gl.enableVertexAttribArray(vPosition);
        // drawing the square using TRIANGLE_STRIP rend_mod
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else if (render === 'TRIANGLE_FAN') {
        // vertices (same thing)
        let vertices = [
            -0.8, 0.8,
            0.8, 0.8,
            0.8, -0.8,
            -0.8, -0.8
        ];
        // create a buffer for the square
        let vBuffer = gl.createBuffer();
        //  the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        // adding data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // defining attribute location for the vertex position
        let vPosition = gl.getAttribLocation(program, 'vPosition');
        //  how the vertex shader interprets the data
        gl.vertexAttribPointer(
            vPosition,
            2,
            gl.FLOAT,
            gl.FALSE,
            0,
            0
        );
        //  the vertex position attribute
        gl.enableVertexAttribArray(vPosition);
        // drawing the square using TRIANGLE_FAN mode
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}
