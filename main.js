import { EffectComposer } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/postprocessing/UnrealBloomPass.js';

class TentacleApp {
    constructor() {
        this.init();
        this.createTentacles();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        document.body.appendChild(this.renderer.domElement);

        // Post-processing
        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);

        // Camera position
        this.camera.position.z = 50;
        
        // Particles
        this.particles = new THREE.Group();
        this.scene.add(this.particles);
        this.createParticles();
    }

    createTentacles() {
        this.tentacles = [];
        const colors = [0x00ffff, 0xff00ff, 0xffff00];
        
        for(let i = 0; i < 3; i++) {
            const geometry = new THREE.BufferGeometry();
            const material = new THREE.LineBasicMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.8
            });
            
            const points = Array.from({ length: 50 }, () => 
                new THREE.Vector3(0, 0, 0)
            );
            
            geometry.setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            this.tentacles.push({ line, points });
            this.scene.add(line);
        }
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        
        for(let i = 0; i < 1000; i++) {
            positions.push(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            colors.push(
                0.2 + Math.random() * 0.8,
                0.2 + Math.random() * 0.8,
                0.2 + Math.random() * 0.8
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particleSystem = new THREE.Points(geometry, material);
        this.particles.add(this.particleSystem);
    }

    setupEventListeners() {
        this.pointer = new THREE.Vector2();
        
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('pointermove', this.onPointerMove.bind(this));
        window.addEventListener('touchmove', this.onPointerMove.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    onPointerMove(event) {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    updateTentacles() {
        const time = performance.now() * 0.001;
        
        this.tentacles.forEach((tentacle, index) => {
            const points = tentacle.points;
            const offset = index * 0.3;
            
            points.forEach((point, i) => {
                const ratio = i / points.length;
                const angle = time * 3 + offset + ratio * Math.PI * 2;
                
                point.x = this.pointer.x * 40 + Math.cos(angle) * 5 * ratio;
                point.y = this.pointer.y * 40 + Math.sin(angle) * 5 * ratio;
                point.z = Math.sin(time + i) * 10 * ratio;
                
                if(i > 0) {
                    point.lerp(points[i-1], 0.3);
                }
            });
            
            tentacle.line.geometry.setFromPoints(points);
            tentacle.line.geometry.attributes.position.needsUpdate = true;
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update elements
        this.updateTentacles();
        this.particles.rotation.x += 0.0001;
        this.particles.rotation.y += 0.0001;
        
        // Render
        this.composer.render();
    }
}

// Start app
new TentacleApp();
