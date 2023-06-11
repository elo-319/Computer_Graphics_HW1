onload = () => {
    // we get the id of canvas from html
    let canvas = document.getElementById('webgl-canvas');
    // sets up webgl
    let gl = WebGLUtils.setupWebGL(canvas);
    // it checks is webgl works or not
    if (!gl) { 
        alert("Couldn't setup webgl"); 
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
    // cordinates of vertices of figure in arrays
    let vertices = [
        -0.6,-0.6,
        0,0.8,
        0.7,-0.3,
        
    ]
    //we create a buffer for figure
    let vBuffer = gl.createBuffer();
    //every time we use buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    // we add data to our buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // add the shaders
    let vPosition = gl.getAttribLocation(program,'vPosition');
    //add vertex shaders values
    gl.vertexAttribPointer(
        vPosition,
        2,
        gl.FLOAT,
        gl.FALSE,
        0,
        0,
    )

    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

}