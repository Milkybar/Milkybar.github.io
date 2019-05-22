var module_math;
(function (module_math) {
    var vec3 = (function () {
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
            get: function () { return this.v[1]; },
            set: function (v) { this.v[1] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec3.prototype, "z", {
            get: function () { return this.v[2]; },
            set: function (v) { this.v[2] = v; },
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
            var len = a.len;
            if (len === 0) {
                d.x = 0;
                d.y = 0;
                d.z = 0;
                return d;
            }
            var inv = 1 / len;
            d.x = a.x * inv;
            d.y = a.y * inv;
            d.z = a.z * inv;
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
var module_math;
(function (module_math) {
    var mat4 = (function () {
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
        mat4.look = function (pos, target, up, d) {
            var z = module_math.vec3.zero;
            module_math.vec3.sub(pos, target, z);
            module_math.vec3.norm(z, z);
            var x = module_math.vec3.zero;
            module_math.vec3.cross(up, z, x);
            module_math.vec3.norm(x, x);
            var y = module_math.vec3.zero;
            module_math.vec3.cross(z, x, y);
            module_math.vec3.norm(y, y);
            d.data = [
                x.x, y.x, z.x, 0,
                x.y, y.y, z.y, 0,
                x.z, y.z, z.z, 0,
                -module_math.vec3.dot(x, pos), -module_math.vec3.dot(y, pos), -module_math.vec3.dot(z, pos), 1,
            ];
            return d;
        };
        return mat4;
    }());
    module_math.mat4 = mat4;
})(module_math || (module_math = {}));
var module_math;
(function (module_math) {
    var quat = (function () {
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
            get: function () { return this.v[1]; },
            set: function (v) { this.v[1] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "z", {
            get: function () { return this.v[2]; },
            set: function (v) { this.v[2] = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(quat.prototype, "w", {
            get: function () { return this.v[3]; },
            set: function (v) { this.v[3] = v; },
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
var math = module_math;
var gl = undefined;
var canvas_width = 0;
var canvas_height = 0;
function resize() {
    var canvas = document.getElementById('backdrop');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
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
}
;
var source_v = "\
precision mediump float;\
\
attribute vec3 vertPosition;\
attribute vec3 vertColor;\
varying vec3 fragColor;\
uniform mat4 mWorld;\
uniform mat4 mView;\
uniform mat4 mProj;\
\
void main()\
{\
  fragColor = vertColor;\
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);\
}\
";
var source_f = "\
precision mediump float;\
\
varying vec3 fragColor;\
void main()\
{\
  gl_FragColor = vec4(abs(fragColor), 1.0);\
}\
";
var source_vert = new Float32Array([
    -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
    1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
    1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0, 0.75, 0.25, 0.5,
    -1.0, -1.0, 1.0, 0.75, 0.25, 0.5,
    -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
    -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,
    1.0, 1.0, 1.0, 0.25, 0.25, 0.75,
    1.0, -1.0, 1.0, 0.25, 0.25, 0.75,
    1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
    1.0, 1.0, -1.0, 0.25, 0.25, 0.75,
    1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
    1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
    -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
    -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
    1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
    1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
    -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
    -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
    1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
    1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
]);
var source_indices = new Int16Array([
    0, 1, 2,
    0, 2, 3,
    5, 4, 6,
    6, 4, 7,
    8, 9, 10,
    8, 10, 11,
    13, 12, 14,
    15, 14, 12,
    16, 17, 18,
    16, 18, 19,
    21, 20, 22,
    22, 20, 23
]);
var shader_v = undefined;
var shader_f = undefined;
var program = undefined;
var buffer_v = undefined;
var buffer_i = undefined;
var matWorldUniformLocation = undefined;
var matViewUniformLocation = undefined;
var matProjUniformLocation = undefined;
var angle = 0;
function initialize() {
    shader_v = gl.createShader(gl.VERTEX_SHADER);
    shader_f = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader_v, source_v);
    gl.shaderSource(shader_f, source_f);
    gl.compileShader(shader_v);
    if (!gl.getShaderParameter(shader_v, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(shader_v));
        return;
    }
    gl.compileShader(shader_f);
    if (!gl.getShaderParameter(shader_f, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(shader_f));
        return;
    }
    program = gl.createProgram();
    gl.attachShader(program, shader_v);
    gl.attachShader(program, shader_f);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        return;
    }
    buffer_v = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_v);
    gl.bufferData(gl.ARRAY_BUFFER, source_vert, gl.STATIC_DRAW);
    buffer_i = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer_i);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source_indices, gl.STATIC_DRAW);
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
}
function render() {
    if (gl === undefined)
        return;
    gl.clearColor(0.1, 0.1, 0.1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.useProgram(program);
    var worldMatrix = math.mat4.ident;
    var viewMatrix = math.mat4.ident;
    var projMatrix = math.mat4.ident;
    var qrot = math.quat.ident;
    math.quat.axis(new math.vec3([0, 1, 0]), angle, qrot);
    qrot.mat4(worldMatrix);
    angle += 1 / 60;
    math.mat4.look(new math.vec3([0, 0, -8]), new math.vec3([0, 0, 0]), new math.vec3([0, 1, 0]), viewMatrix);
    math.mat4.pers(45, canvas_width / canvas_height, 0.1, 1000.0, projMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix.data);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix.data);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix.data);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_v);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer_i);
    gl.drawElements(gl.TRIANGLES, source_indices.length, gl.UNSIGNED_SHORT, 0);
}
window.onload = function () {
    resize();
    initialize();
};
window.onresize = function () {
    resize();
};
function main_loop() {
    render();
    window.requestAnimationFrame(main_loop);
}
;
var resource_request = new XMLHttpRequest();
resource_request.open("GET", "resources/output.png", true);
resource_request.responseType = "arraybuffer";
resource_request.onload = function (event) {
    var array_buffer = resource_request.response;
    if (array_buffer) {
        var header = new DataView(array_buffer, 0);
        var vertices_count = header.getUint16(0, true);
        var indices_count = header.getUint16(2, true);
        var vert_size = 6;
        var float_size = 4;
        var vertices_start = 4;
        var vertices_end = vertices_start + vertices_count * vert_size * float_size;
        var vertices = new Float32Array(array_buffer.slice(vertices_start, vertices_end));
        var short_size = 2;
        var indices_start = vertices_end;
        var indices_end = indices_start + indices_count * short_size;
        var indices = new Uint16Array(array_buffer.slice(indices_start, indices_end));
        source_vert = vertices;
        source_indices = indices;
        initialize();
        window.requestAnimationFrame(main_loop);
    }
    else {
        console.log("Could not read file into array buffer.");
    }
};
resource_request.send(null);
