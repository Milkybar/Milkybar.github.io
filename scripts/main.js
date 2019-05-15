var module_math;
(function (module_math) {
    var vec3 = /** @class */ (function () {
        function vec3(v) {
            this.v = new Float32Array(3);
            this.v[0] = v[0];
            this.v[1] = v[1];
            this.v[2] = v[2];
        }
        Object.defineProperty(vec3.prototype, "x", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "y", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "z", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "xyz", {
            get: function () {
                return [
                    this.v[0],
                    this.v[1],
                    this.v[2]
                ];
            },
            set: function (v) {
                this.v[0] = v[0];
                this.v[1] = v[1];
                this.v[2] = v[2];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "len_sqrd", {
            get: function () {
                var x = this.x;
                var y = this.y;
                var z = this.z;
                return x * x + y * y + z * z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "len", {
            get: function () {
                return Math.sqrt(this.len_sqrd);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3, "zero", {
            get: function () { return new vec3([0, 0, 0]); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3, "one", {
            get: function () { return new vec3([1, 1, 1]); },
            enumerable: true,
            configurable: true
        });
        vec3.add = function (a, b, d) {
            d.x = a.x + b.x;
            d.y = a.y + b.y;
            d.z = a.z + b.z;
            return d;
        };
        vec3.sub = function (a, b, d) {
            d.x = a.x - b.x;
            d.y = a.y - b.y;
            d.z = a.z - b.z;
            return d;
        };
        vec3.mul = function (a, n, d) {
            d.x = a.x * n;
            d.y = a.y * n;
            d.z = a.z * n;
            return d;
        };
        vec3.negate = function (a, d) {
            d.x = -a.x;
            d.y = -a.y;
            d.z = -a.z;
            return d;
        };
        vec3.norm = function (a, d) {
            var len = this.length;
            if (len === 0) {
                d.x = 0;
                d.y = 0;
                d.z = 0;
                return d;
            }
            var inv = 1 / len;
            d.x = a.x * len;
            d.y = a.y * len;
            d.z = a.z * len;
            return d;
        };
        vec3.lerp = function (a, b, t, d) {
            d.x = a.x + (b.x - a.x) * t;
            d.y = a.y + (b.y - a.y) * t;
            d.z = a.z + (b.z - a.z) * t;
            return d;
        };
        vec3.dot = function (a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        };
        vec3.cross = function (a, b, d) {
            var ax = a.x;
            var ay = a.y;
            var az = a.z;
            var bx = b.x;
            var by = b.y;
            var bz = b.z;
            d.x = ay * bz - az * by;
            d.y = az * bx - ax * bz;
            d.z = ax * by - ay * bx;
            return d;
        };
        return vec3;
    }());
    module_math.vec3 = vec3;
})(module_math || (module_math = {}));
// note : this is probably the minium vector functionaity that we need
// a solid mat4 and quaternion class should give us what we need
// see reference toMat4() in quat.ts
// we can use quaternions as our rotation, and transform to matrices
// when we are ready to feed into the shader
var module_math;
(function (module_math) {
    var mat4 = /** @class */ (function () {
        function mat4(v) {
            this.v = new Float32Array(16);
            this.data = v;
        }
        Object.defineProperty(mat4.prototype, "data", {
            get: function () {
                var r = this.v;
                return [
                    r[0], r[1], r[2], r[3],
                    r[4], r[5], r[6], r[7],
                    r[8], r[9], r[10], r[11],
                    r[12], r[13], r[14], r[15]
                ];
            },
            set: function (v) {
                var r = this.v;
                r[0] = v[0];
                r[1] = v[1];
                r[2] = v[2];
                r[3] = v[3];
                r[4] = v[4];
                r[5] = v[5];
                r[6] = v[6];
                r[7] = v[7];
                r[8] = v[8];
                r[9] = v[9];
                r[10] = v[10];
                r[11] = v[11];
                r[12] = v[12];
                r[13] = v[13];
                r[14] = v[14];
                r[15] = v[15];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(mat4, "ident", {
            get: function () {
                return new mat4([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]);
            },
            enumerable: true,
            configurable: true
        });
        // note : not implemented yet, might not actully need these
        // determinant? what do we need this for?
        // transpose? again, do we need this?
        // inverse. sounds more useful
        mat4.mul = function (a, b, d) {
            var av = a.data;
            var bv = b.data;
            var i = 0;
            for (var r = 0; r < 4; r++) {
                for (var c = 0; c < 4; c++) {
                    var ri = r * 4;
                    d.v[ri + c] =
                        av[ri] * bv[c] +
                            av[ri + 1] * bv[c + 4] +
                            av[ri + 2] * bv[c + 8] +
                            av[ri + 3] * bv[c + 12];
                    i++;
                }
            }
            return d;
        };
        mat4.prototype.mul = function (b, w) {
            var x = b.x;
            var y = b.y;
            var z = b.z;
            var v = this.v;
            return [
                v[0] * x + v[1] * y + v[2] * z + v[3] * w,
                v[4] * x + v[5] * y + v[5] * z + v[7] * w,
                v[8] * x + v[9] * y + v[10] * z + v[11] * w,
                v[12] * x + v[13] * y + v[14] * z + v[15] * w
            ];
        };
        mat4.prototype.mul0 = function (b) {
            var x = b.x;
            var y = b.y;
            var z = b.z;
            var v = this.v;
            return [
                v[0] * x + v[1] * y + v[2] * z,
                v[4] * x + v[5] * y + v[5] * z,
                v[8] * x + v[9] * y + v[10] * z,
                v[12] * x + v[13] * y + v[14] * z
            ];
        };
        mat4.prototype.mul1 = function (b) {
            var x = b.x;
            var y = b.y;
            var z = b.z;
            var v = this.v;
            return [
                v[0] * x + v[1] * y + v[2] * z + v[3],
                v[4] * x + v[5] * y + v[5] * z + v[7],
                v[8] * x + v[9] * y + v[10] * z + v[11],
                v[12] * x + v[13] * y + v[14] * z + v[15]
            ];
        };
        // todo : some kind of vec4 multiplier interface?
        mat4.trans = function (t, d) {
            d.data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                t.x, t.y, t.z, 1
            ];
            return d;
        };
        mat4.scale = function (s, d) {
            d.data = [
                s.x, 0, 0, 0,
                0, s.y, 0, 0,
                0, 0, s.z, 0,
                0, 0, 0, 1
            ];
            return d;
        };
        mat4.frustum = function (l, r, b, t, n, f, d) {
            var rl = r - l;
            var tb = t - b;
            var fn = f - n;
            d.data = [
                (n * 2) / rl, 0, 0, 0,
                0, (n * 2) / tb, 0, 0,
                (r + l) / rl, (t + b) / tb, -(f + n) / fn, -1,
                0, 0, -(f * n * 2) / fn, 0,
            ];
            return d;
        };
        mat4.pers = function (fov, aspect, n, f, d) {
            var t = n * Math.tan(fov * Math.PI / 360.0);
            var r = t * aspect;
            return mat4.frustum(-r, r, -t, t, n, f, d);
        };
        mat4.orthographic = function (l, r, b, t, n, f, d) {
            var rl = r - l;
            var tb = t - b;
            var fn = f - n;
            d.data = [
                2 / rl, 0, 0, 0,
                0, 2 / tb, 0, 0,
                0, 0, -2 / fn, 0,
                -(l + r) / rl, -(t + b) / tb, -(f + n) / fn, 1,
            ];
            return d;
        };
        return mat4;
    }());
    module_math.mat4 = mat4;
})(module_math || (module_math = {}));
var module_math;
(function (module_math) {
    var quat = /** @class */ (function () {
        function quat(v) {
            this.v = new Float32Array(4);
            this.v[0] = v[0];
            this.v[1] = v[1];
            this.v[2] = v[2];
            this.v[3] = v[3];
        }
        Object.defineProperty(quat.prototype, "x", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "y", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "z", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "w", {
            get: function () { return this.v[0]; },
            set: function (v) { this.v[0] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "xyzw", {
            get: function () {
                return [
                    this.v[0],
                    this.v[1],
                    this.v[2],
                    this.v[3]
                ];
            },
            set: function (v) {
                this.v[0] = v[0];
                this.v[1] = v[1];
                this.v[2] = v[2];
                this.v[3] = v[3];
            },
            enumerable: true,
            configurable: true
        });
        quat.prototype.mul = function (b, d) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var w = this.w;
            var vx = b.x;
            var vy = b.y;
            var vz = b.z;
            var ix = w * vx + y * vz - z * vy;
            var iy = w * vy + z * vx - x * vz;
            var iz = w * vz + x * vy - y * vx;
            var iw = -x * vx - y * vy - z * vz;
            d.x = ix * w + iw * -x + iy * -z - iz * -y;
            d.y = iy * w + iw * -y + iz * -x - ix * -z;
            d.z = iz * w + iw * -z + ix * -y - iy * -x;
            return d;
        };
        quat.prototype.mat4 = function (d) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var w = this.w;
            var x2 = x + x;
            var y2 = y + y;
            var z2 = z + z;
            var xx = x * x2;
            var xy = x * y2;
            var xz = x * z2;
            var yy = y * y2;
            var yz = y * z2;
            var zz = z * z2;
            var wx = w * x2;
            var wy = w * y2;
            var wz = w * z2;
            d.data = [
                1 - (yy + zz), xy + wz, xz - wy, 0,
                xy - wz, 1 - (xx + zz), yz + wx, 0,
                xz + wy, yz - wx, 1 - (xx + yy), 0,
                0, 0, 0, 1,
            ];
            return d;
        };
        Object.defineProperty(quat, "ident", {
            get: function () { return new quat([0, 0, 0, 1]); },
            enumerable: true,
            configurable: true
        });
        quat.inv = function (a, d) {
            var x = a.x;
            var y = a.y;
            var z = a.z;
            var w = a.w;
            var dot = x * x + y * y + z * z + w * w;
            if (!dot) {
                d.x = 0;
                d.y = 0;
                d.z = 0;
                d.z = 0;
                return d;
            }
            var i = -(dot ? 1 / dot : 0);
            d.x = x * i;
            d.y = y * i;
            d.z = z * i;
            d.w = w * i;
            return d;
        };
        quat.conj = function (a, d) {
            d.x = -a.x;
            d.y = -a.y;
            d.z = -a.z;
            d.w = -a.w;
            return d;
        };
        quat.norm = function (a, d) {
            var x = a.x;
            var y = a.y;
            var z = a.z;
            var w = a.w;
            var len = Math.sqrt(x * x + y * y + z * z + w * w);
            if (!len) {
                d.x = 0;
                d.y = 0;
                d.z = 0;
                d.w = 0;
                return d;
            }
            var inv = 1 / len;
            d.x = x * inv;
            d.y = y * inv;
            d.z = z * inv;
            d.w = w * inv;
            return d;
        };
        quat.mul = function (a, b, d) {
            var ax = a.x;
            var ay = a.y;
            var az = a.z;
            var aw = a.w;
            var bx = b.x;
            var by = b.y;
            var bz = b.z;
            var bw = b.w;
            d.x = ax * bw + aw * bx + ay * bz - az * by;
            d.y = ay * bw + aw * by + az * bx - ax * bz;
            d.z = az * bw + aw * bz + ax * by - ay * bx;
            d.w = aw * bw - ax * bx - ay * by - az * bz;
            return d;
        };
        quat.axis = function (v, a, d) {
            a *= 0.5;
            var sin = Math.sin(a);
            d.x = v.x * sin;
            d.y = v.y * sin;
            d.z = v.z * sin;
            d.w = Math.cos(a);
            return d;
        };
        return quat;
    }());
    module_math.quat = quat;
})(module_math || (module_math = {}));
/*
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}
*/
// woo! we have a fullscreen canvas as a background element.
// now we can render all kinds of cool stuff!
// time to see what kind of 3d content we can get into this thing
// and add it to source control!
/// <reference path="./../../Math/src/vec3.ts" />
/// <reference path="./../../Math/src/mat4.ts" />
/// <reference path="./../../Math/src/quat.ts" />
var math = module_math;
// todo : can we import the name directly to avoid the overhead of writing math. everywhere
//import * as math from "./source/vec2";
var gl = undefined; // store the context and size etc in some kind of structure
var canvas_width = 0;
var canvas_height = 0;
function resize() {
    var canvas = document.getElementById('backdrop');
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvas_width = canvas.width;
    canvas_height = canvas.height;
    gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        depth: true,
        failIfMajorPerformanceCaveat: true,
        powerPreference: "high-performance",
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        stencil: false
    });
    // todo : if we do net get a gl context we can try get an experimental context
    // todo : if we still dont get a context we need to do something rather just borking the site
}
;
var source_v = "\
precision mediump float;\
\
attribute vec2 vertPosition;\
attribute vec3 vertColor;\
varying vec3 fragColor;\
\
void main()\
{\
    fragColor = vertColor;\
    gl_Position = vec4(vertPosition, 0.0, 1.0);\
}\
";
var source_f = "\
precision mediump float;\
\
varying vec3 fragColor;\
void main()\
{\
    gl_FragColor = vec4(fragColor, 1.0);\
}\
";
var source_vert = new Float32Array([
    0.0, 0.5, 1.0, 1.0, 0.0,
    -0.5, -0.5, 0.7, 0.0, 1.0,
    0.5, -0.5, 0.1, 1.0, 0.6
]);
var shader_v = undefined;
var shader_f = undefined;
var program = undefined;
var buffer_v = undefined;
function initialize() {
    // *** load shaders ***
    shader_v = gl.createShader(gl.VERTEX_SHADER);
    shader_f = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader_v, source_v);
    gl.shaderSource(shader_f, source_f);
    gl.compileShader(shader_v);
    if (!gl.getShaderParameter(shader_v, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(shader_v)); // todo : some kind of fallback if we fail to compile.
        return;
    }
    gl.compileShader(shader_f);
    if (!gl.getShaderParameter(shader_f, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(shader_f)); // todo : some kind of fallback if we fail to compile.
        return;
    }
    program = gl.createProgram();
    gl.attachShader(program, shader_v);
    gl.attachShader(program, shader_f);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program)); // todo : some better kind of fallback
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program)); // todo : some better kind of fallback
        return;
    }
    // *** load vertices ***
    buffer_v = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_v);
    gl.bufferData(gl.ARRAY_BUFFER, source_vert, gl.STATIC_DRAW);
    // *** map vertex data to program attributes ***
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(positionAttribLocation, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    false, //gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(colorAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    false, //gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
}
function render() {
    if (gl === undefined)
        return; // dont render if we dont have a context yet...
    gl.clearColor(0.1, 0.1, 0.1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program); // use this program to render
    //gl.bindBuffer(gl.ARRAY_BUFFER, buffer_v);   // use this vertex buffer for rendering
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
window.onload = function () {
    resize(); // this will also grab the initial context
    initialize(); // todo : break this down into routines to load shaders etc.
    function main_loop() {
        render();
    }
    ;
    setInterval(main_loop, 60 / 1);
};
window.onresize = function () {
    resize();
};
//# sourceMappingURL=main.js.map