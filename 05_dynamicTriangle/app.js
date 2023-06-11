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

    //this function if for convering pixel cordinates to clip cordinates
    function pixelToClip2D(pixelVertices) {
        let clipVertices = [];// I create empty array to store clip cordinates
        //CW is width of canvas and CH is height 
        const CW = canvas.width; //we get the width of canvas
        const CH = canvas.height;//we get the height of canvas
        const halfOfWidth = CW / 2;// we just calculate and find half of canvas width
        const halfOfHeight = CH / 2;// we just calculate and find half of canvas height
        // now we have pixel arrays.
        for (let i = 0; i < pixelVertices.length; i += 2) {
             //here we calculate each pixel and scale each of them for clip -
            // cordinates from -1 to 1
            let x = (pixelVertices[i] - halfOfWidth) / halfOfWidth;
            let y = (halfOfHeight - pixelVertices[i + 1]) / halfOfHeight;
            // we convert the values to clip cordinates(Vertices) array
            clipVertices.push(x, y);
        }
        //return the array of clip cordinates
        return clipVertices;
    }

    // we can use shaders in program
    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // we are clearing color of the canvas
    gl.clearColor(0, 0, 0, 1);
    // we are clearing color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    // follows clicked points
    let ClckPt = [];

    //we create a buffer for figure
    let vBuffer = gl.createBuffer();

    // we add event lissener from js, so when mouse clicked on canvas it will work
    canvas.addEventListener('click', function(event) {
        //here we get cordinates
        let r = canvas.getBoundingClientRect();
        let x = event.clientX - r.left;
        let y = event.clientY - r.top;

        //with the help of push we save them (values fo clicked points)
        ClckPt.push(x, y);

        // we are clearing color of the canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        // render triangle if there are enough points
        if (ClckPt.length === 6) {
            // we use function and attributes
            let vertices = pixelToClip2D(ClckPt);

            //every time we use buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            // we add data to our buffer
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            // add the shaders
            let vPosition = gl.getAttribLocation(program, 'vPosition');
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);
            gl.enableVertexAttribArray(vPosition);

            //uniform location for the color (we get it from html)
            let colorOfUniform = gl.getUniformLocation(program, 'colorOfUniform');

            // it wad different in task 3 but I just take A value as static 1.0 here
            let randomColor = [Math.random(), Math.random(), Math.random(), 1.0];
            //transfers values to color unifofmr
            gl.uniform4fv(colorOfUniform, randomColor);

            //draw figure (triangle)
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            // we are clearing for next triangle
            ClckPt = [];
        }
    });
};
