// rayjs FPS binding stress test
// Features:
// - first person controls (mouse look + WASD)
// - hitscan weapon (fire, reload, recoil, tracers)
// - enemy AI (pursue, strafe, ranged projectiles)
// - waves, score, pickups
// - UI (menu, pause, game over, HUD, minimap) with raygui

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const ARENA_HALF = 22;
const EYE_HEIGHT = 1.8;

setConfigFlags(FLAG_WINDOW_HIGHDPI | FLAG_MSAA_4X_HINT | FLAG_VSYNC_HINT);
initWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "rayjs FPS - Binding Stress Test");
setExitKey(0);
setTargetFPS(60);

const STATE_MENU = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;
const STATE_GAMEOVER = 3;

const ENEMY_BASE_RADIUS = 0.45;
const ENEMY_PROJECTILE_SPEED = 15.5;
const PLAYER_RADIUS = 0.35;
const PLAYER_MAX_HEALTH = 100;
const PLAYER_CLIP_SIZE = 12;
const PLAYER_RESERVE_AMMO = 84;
const LOOK_SENSITIVITY = 0.0025;

const MAP_PANEL = new Rectangle(SCREEN_WIDTH - 240, 16, 220, 220);
const AUTO_START_FOR_STRESS = true;

let gameState = STATE_MENU;
let hardMode = false;
let quitRequested = false;
let cursorCaptured = false;
let menuAutoStartTimer = 1.2;

let camera = null;
let yaw = 0;
let pitch = 0;

let player = null;
let enemies = [];
let enemyProjectiles = [];
let tracers = [];
let pickups = [];
let obstacles = [];
let walls = [];

let wave = 1;
let waveTimer = 0;
let hitMarkerTimer = 0;
let messageTimer = 0;
let messageText = "";

setupWorld();
resetGame();
setMenuCursor(true);

while (!windowShouldClose() && !quitRequested) {
    const dt = Math.min(getFrameTime(), 1 / 30);
    const now = getTime();

    updateState(dt, now);
    drawState(now);
}

if (cursorCaptured) enableCursor();
closeWindow();

function setupWorld() {
    const raw = [
        { x: -8, z: -7, w: 5, h: 2.3, d: 3, color: new Color(70, 90, 130, 255) },
        { x: 6, z: -6, w: 4, h: 2.8, d: 4, color: new Color(95, 75, 60, 255) },
        { x: -2, z: 2, w: 7, h: 2.5, d: 2, color: new Color(75, 85, 85, 255) },
        { x: 10, z: 7, w: 3, h: 2.2, d: 6, color: new Color(70, 80, 100, 255) },
        { x: -12, z: 8, w: 4, h: 3.0, d: 3, color: new Color(90, 70, 65, 255) },
        { x: 0, z: -12, w: 8, h: 2.0, d: 2, color: new Color(80, 80, 95, 255) }
    ];

    obstacles = raw.map(o => {
        const center = new Vector3(o.x, o.h / 2, o.z);
        const size = new Vector3(o.w, o.h, o.d);
        const min = new Vector3(o.x - o.w / 2, 0, o.z - o.d / 2);
        const max = new Vector3(o.x + o.w / 2, o.h, o.z + o.d / 2);
        return {
            center,
            size,
            min,
            max,
            box: new BoundingBox(min, max),
            color: o.color
        };
    });

    walls = [
        makeWall(0, 2.5, -ARENA_HALF, ARENA_HALF * 2, 5, 1),
        makeWall(0, 2.5, ARENA_HALF, ARENA_HALF * 2, 5, 1),
        makeWall(-ARENA_HALF, 2.5, 0, 1, 5, ARENA_HALF * 2),
        makeWall(ARENA_HALF, 2.5, 0, 1, 5, ARENA_HALF * 2)
    ];
}

function makeWall(x, y, z, w, h, d) {
    const min = new Vector3(x - w / 2, 0, z - d / 2);
    const max = new Vector3(x + w / 2, h, z + d / 2);
    return {
        center: new Vector3(x, y, z),
        size: new Vector3(w, h, d),
        min,
        max,
        box: new BoundingBox(min, max)
    };
}

function resetGame() {
    player = {
        health: PLAYER_MAX_HEALTH,
        maxHealth: PLAYER_MAX_HEALTH,
        clip: PLAYER_CLIP_SIZE,
        clipSize: PLAYER_CLIP_SIZE,
        reserve: PLAYER_RESERVE_AMMO,
        score: 0,
        kills: 0,
        fireCooldown: 0,
        reloadTimer: 0,
        reloadDuration: 1.35,
        recoil: 0,
        hurtFlash: 0,
        spawnProtection: 1.0
    };

    wave = 1;
    waveTimer = 1.0;
    enemies = [];
    enemyProjectiles = [];
    tracers = [];
    pickups = [];
    hitMarkerTimer = 0;
    messageTimer = 0;
    messageText = "";
    menuAutoStartTimer = 1.2;

    const startPos = new Vector3(0, EYE_HEIGHT, 12);
    yaw = Math.PI;
    pitch = -0.02;
    camera = new Camera3D(
        startPos,
        new Vector3(0, EYE_HEIGHT, 11),
        new Vector3(0, 1, 0),
        70.0,
        CAMERA_PERSPECTIVE
    );
    updateCameraFromAngles();
}

function updateState(dt, now) {
    if (isKeyPressed(KEY_ESCAPE)) {
        if (gameState === STATE_PLAYING) {
            gameState = STATE_PAUSED;
            setMenuCursor(true);
        } else if (gameState === STATE_PAUSED) {
            gameState = STATE_PLAYING;
            setMenuCursor(false);
        }
    }

    switch (gameState) {
        case STATE_MENU:
            updateMenu(dt);
            break;
        case STATE_PLAYING:
            updatePlaying(dt, now);
            break;
        case STATE_PAUSED:
            updatePaused();
            break;
        case STATE_GAMEOVER:
            updateGameOver();
            break;
        default:
            break;
    }
}

function updateMenu(dt) {
    setMenuCursor(true);
    if (AUTO_START_FOR_STRESS) {
        menuAutoStartTimer -= dt;
        if (menuAutoStartTimer <= 0) {
            resetGame();
            gameState = STATE_PLAYING;
            setMenuCursor(false);
        }
    }
}

function updatePaused() {
    setMenuCursor(true);
}

function updateGameOver() {
    setMenuCursor(true);
}

function updatePlaying(dt, now) {
    setMenuCursor(false);

    player.fireCooldown = Math.max(0, player.fireCooldown - dt);
    player.reloadTimer = Math.max(0, player.reloadTimer - dt);
    player.recoil = Math.max(0, player.recoil - dt * 5.2);
    player.hurtFlash = Math.max(0, player.hurtFlash - dt * 2.6);
    player.spawnProtection = Math.max(0, player.spawnProtection - dt);
    hitMarkerTimer = Math.max(0, hitMarkerTimer - dt * 4.0);
    messageTimer = Math.max(0, messageTimer - dt);

    if (player.reloadTimer === 0 && player.clip < player.clipSize && player.reserve > 0 && isReloadingFinished()) {
        const needed = player.clipSize - player.clip;
        const moved = Math.min(needed, player.reserve);
        player.clip += moved;
        player.reserve -= moved;
    }

    updatePlayerLook();
    updatePlayerMove(dt);
    updatePlayerWeapon(dt);
    updateEnemies(dt, now);
    updateEnemyProjectiles(dt);
    updateTracers(dt);
    updatePickups(dt, now);
    updateWaveFlow();

    if (player.health <= 0) {
        player.health = 0;
        gameState = STATE_GAMEOVER;
        setMenuCursor(true);
    }
}

function isReloadingFinished() {
    return player.reloadTimer === 0 && player.__reloadApplied !== true;
}

function beginReload() {
    if (player.reloadTimer > 0) return;
    if (player.clip >= player.clipSize) return;
    if (player.reserve <= 0) return;
    player.reloadTimer = player.reloadDuration;
    player.__reloadApplied = false;
}

function tryApplyReload() {
    if (player.reloadTimer > 0) return;
    if (player.__reloadApplied) return;
    const needed = player.clipSize - player.clip;
    const moved = Math.min(needed, player.reserve);
    player.clip += moved;
    player.reserve -= moved;
    player.__reloadApplied = true;
}

function updatePlayerLook() {
    const md = getMouseDelta();
    yaw -= md.x * LOOK_SENSITIVITY;
    pitch -= md.y * LOOK_SENSITIVITY;

    const maxPitch = 1.35;
    if (pitch > maxPitch) pitch = maxPitch;
    if (pitch < -maxPitch) pitch = -maxPitch;

    updateCameraFromAngles();
}

function updateCameraFromAngles() {
    const cp = Math.cos(pitch);
    const dir = new Vector3(
        Math.sin(yaw) * cp,
        Math.sin(pitch),
        Math.cos(yaw) * cp
    );
    camera.target = vector3Add(camera.position, dir);
}

function updatePlayerMove(dt) {
    const forward = new Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    const right = new Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    let move = new Vector3(0, 0, 0);

    if (isKeyDown(KEY_W)) move = vector3Add(move, forward);
    if (isKeyDown(KEY_S)) move = vector3Subtract(move, forward);
    if (isKeyDown(KEY_D)) move = vector3Add(move, right);
    if (isKeyDown(KEY_A)) move = vector3Subtract(move, right);

    const len = vector3Length(move);
    if (len > 0.001) move = vector3Scale(move, 1.0 / len);

    const speed = isKeyDown(KEY_LEFT_SHIFT) ? 7.2 : 5.4;
    const delta = vector3Scale(move, speed * dt);
    let next = moveCharacter(camera.position, delta, PLAYER_RADIUS);
    next.y = EYE_HEIGHT;
    camera.position = next;
    updateCameraFromAngles();
}

function updatePlayerWeapon(dt) {
    if (isKeyPressed(KEY_R)) beginReload();

    if (player.reloadTimer > 0) {
        if (player.__reloadApplied === undefined) player.__reloadApplied = false;
        if (player.reloadTimer - dt <= 0) {
            player.reloadTimer = 0;
            tryApplyReload();
            player.__reloadApplied = false;
        }
    } else {
        player.__reloadApplied = false;
    }

    if (isMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
        if (player.reloadTimer > 0) return;
        if (player.fireCooldown > 0) return;
        if (player.clip <= 0) {
            beginReload();
            return;
        }
        player.clip--;
        player.fireCooldown = 0.13;
        player.recoil = Math.min(1.0, player.recoil + 0.5);
        fireHitscan();
    }
}

function fireHitscan() {
    const center = new Vector2(getScreenWidth() / 2, getScreenHeight() / 2);
    const ray = getScreenToWorldRay(center, camera);
    const shootDir = vector3Normalize(vector3Subtract(camera.target, camera.position));

    let hitIndex = -1;
    let hitPoint = vector3Add(camera.position, vector3Scale(shootDir, 80));
    let nearest = 1e9;

    for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.hp <= 0) continue;
        const rc = getRayCollisionSphere(ray, e.position, e.radius);
        if (rc.hit && rc.distance < nearest) {
            nearest = rc.distance;
            hitIndex = i;
            hitPoint = rc.point;
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        const rc = getRayCollisionBox(ray, obstacles[i].box);
        if (rc.hit && rc.distance < nearest) {
            nearest = rc.distance;
            hitIndex = -1;
            hitPoint = rc.point;
        }
    }

    tracers.push({
        from: new Vector3(camera.position.x, camera.position.y - 0.08, camera.position.z),
        to: hitPoint,
        life: 0.08
    });

    if (hitIndex >= 0) {
        const e = enemies[hitIndex];
        const damage = hardMode ? 26 : 34;
        e.hp -= damage;
        e.hitFlash = 0.2;
        hitMarkerTimer = 1.0;
        if (e.hp <= 0) {
            player.kills++;
            player.score += 10 + wave * 2;
        }
    }
}

function updateEnemies(dt, now) {
    const playerPos = new Vector3(camera.position.x, 1.0, camera.position.z);
    const alive = [];

    for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.hp <= 0) continue;

        e.fireCooldown -= dt;
        e.aiTimer -= dt;
        e.hitFlash = Math.max(0, e.hitFlash - dt * 5.0);

        const toPlayer = vector3Subtract(playerPos, e.position);
        const dist = vector3Length(toPlayer);
        let toPlayerDir = new Vector3(0, 0, 1);
        if (dist > 0.0001) toPlayerDir = vector3Scale(toPlayer, 1.0 / dist);

        if (e.aiTimer <= 0) {
            e.aiTimer = randf(0.5, 1.4);
            e.strafe = randf(-1.0, 1.0);
        }

        let moveDir = toPlayerDir;
        if (dist < 2.2) moveDir = vector3Negate(toPlayerDir);
        const strafeDir = new Vector3(-toPlayerDir.z, 0, toPlayerDir.x);
        moveDir = vector3Normalize(vector3Add(vector3Scale(moveDir, 0.84), vector3Scale(strafeDir, e.strafe * 0.35)));

        const step = vector3Scale(moveDir, e.speed * dt);
        e.position = moveCharacter(e.position, step, e.radius);

        if (dist < 18 && e.fireCooldown <= 0 && hasLineOfSight(e.position, playerPos)) {
            const shotDir = vector3Normalize(vector3Add(toPlayerDir, new Vector3(randf(-0.04, 0.04), randf(-0.015, 0.02), randf(-0.04, 0.04))));
            enemyProjectiles.push({
                position: new Vector3(e.position.x, e.position.y + 0.2, e.position.z),
                velocity: vector3Scale(shotDir, ENEMY_PROJECTILE_SPEED),
                life: 3.5,
                damage: hardMode ? 10 : 7
            });
            e.fireCooldown = randf(0.8, 1.7) * (hardMode ? 0.9 : 1.0);
        }

        if (dist < 1.3 && player.spawnProtection <= 0) {
            applyDamage((hardMode ? 18 : 12) * dt);
        }

        alive.push(e);
    }

    enemies = alive;
}

function updateEnemyProjectiles(dt) {
    const playerPos = new Vector3(camera.position.x, 1.0, camera.position.z);
    const alive = [];

    for (let i = 0; i < enemyProjectiles.length; i++) {
        const p = enemyProjectiles[i];
        p.life -= dt;
        if (p.life <= 0) continue;

        const next = vector3Add(p.position, vector3Scale(p.velocity, dt));
        if (isPositionBlocked(next, 0.05)) continue;

        if (vector3Distance(next, playerPos) <= 0.45) {
            applyDamage(p.damage);
            continue;
        }

        p.position = next;
        alive.push(p);
    }

    enemyProjectiles = alive;
}

function updateTracers(dt) {
    const alive = [];
    for (let i = 0; i < tracers.length; i++) {
        const t = tracers[i];
        t.life -= dt;
        if (t.life > 0) alive.push(t);
    }
    tracers = alive;
}

function updatePickups(dt, now) {
    const playerPos = new Vector3(camera.position.x, 0.8, camera.position.z);
    const alive = [];

    for (let i = 0; i < pickups.length; i++) {
        const p = pickups[i];
        p.life -= dt;
        p.bob += dt * 2.3;
        if (p.life <= 0) continue;

        if (vector3Distance(playerPos, p.position) < 0.9) {
            if (p.type === "ammo") {
                player.reserve += 20;
                messageText = "+20 AMMO";
            } else {
                player.health = Math.min(player.maxHealth, player.health + 30);
                messageText = "+30 HP";
            }
            messageTimer = 1.2;
            continue;
        }

        alive.push(p);
    }

    pickups = alive;
}

function updateWaveFlow() {
    if (enemies.length === 0) {
        waveTimer -= getFrameTime();
        if (waveTimer <= 0) {
            spawnWave(wave);
            spawnPickup(wave % 2 === 0 ? "heal" : "ammo");
            wave++;
            waveTimer = 3.2;
        }
    }
}

function spawnWave(w) {
    const count = Math.min(4 + w * 2, 26);
    const hpBase = hardMode ? 52 : 42;
    const speedBase = hardMode ? 2.2 : 1.75;

    for (let i = 0; i < count; i++) {
        const p = randomSpawnAroundPlayer(6.5, 18.0);
        enemies.push({
            position: p,
            radius: ENEMY_BASE_RADIUS + (w % 6 === 0 ? 0.06 : 0),
            hp: hpBase + Math.floor(w * 5.3),
            fireCooldown: randf(0.4, 1.6),
            aiTimer: randf(0.1, 1.0),
            strafe: randf(-1.0, 1.0),
            speed: Math.min(3.4, speedBase + w * 0.06),
            hitFlash: 0
        });
    }
}

function spawnPickup(type) {
    const p = randomSpawnPoint(new Vector3(0, 0.6, 0), 0.35);
    pickups.push({
        type,
        position: p,
        life: 22,
        bob: randf(0, Math.PI * 2)
    });
}

function randomSpawnAroundPlayer(minR, maxR) {
    const playerPos = new Vector3(camera.position.x, 0.9, camera.position.z);
    for (let i = 0; i < 90; i++) {
        const ang = randf(0, Math.PI * 2);
        const r = randf(minR, maxR);
        const p = new Vector3(playerPos.x + Math.sin(ang) * r, 0.9, playerPos.z + Math.cos(ang) * r);
        if (!isPositionBlocked(p, 0.5)) return p;
    }
    return randomSpawnPoint(new Vector3(0, 0.9, 0), 0.5);
}

function randomSpawnPoint(base, radius) {
    for (let i = 0; i < 100; i++) {
        const p = new Vector3(randf(-ARENA_HALF + 2, ARENA_HALF - 2), base.y, randf(-ARENA_HALF + 2, ARENA_HALF - 2));
        if (!isPositionBlocked(p, radius)) return p;
    }
    return new Vector3(0, base.y, 0);
}

function applyDamage(value) {
    if (player.spawnProtection > 0) return;
    player.health -= value;
    player.hurtFlash = Math.min(1.0, player.hurtFlash + 0.24);
}

function moveCharacter(position, delta, radius) {
    let out = new Vector3(position.x, position.y, position.z);

    out.x += delta.x;
    if (isPositionBlocked(out, radius)) out.x -= delta.x;

    out.z += delta.z;
    if (isPositionBlocked(out, radius)) out.z -= delta.z;

    return out;
}

function isPositionBlocked(pos, radius) {
    if (pos.x < -ARENA_HALF + radius || pos.x > ARENA_HALF - radius) return true;
    if (pos.z < -ARENA_HALF + radius || pos.z > ARENA_HALF - radius) return true;

    for (let i = 0; i < obstacles.length; i++) {
        if (sphereIntersectsBox(pos, radius, obstacles[i].min, obstacles[i].max)) return true;
    }
    return false;
}

function sphereIntersectsBox(center, radius, bmin, bmax) {
    const x = clamp(center.x, bmin.x, bmax.x);
    const y = clamp(center.y, bmin.y, bmax.y);
    const z = clamp(center.z, bmin.z, bmax.z);
    const dx = center.x - x;
    const dy = center.y - y;
    const dz = center.z - z;
    return dx * dx + dy * dy + dz * dz <= radius * radius;
}

function hasLineOfSight(from, to) {
    const dir = vector3Normalize(vector3Subtract(to, from));
    const dist = vector3Distance(from, to);
    const ray = new Ray(from, dir);

    for (let i = 0; i < obstacles.length; i++) {
        const rc = getRayCollisionBox(ray, obstacles[i].box);
        if (rc.hit && rc.distance < dist) return false;
    }
    return true;
}

function setMenuCursor(menuMode) {
    if (menuMode && cursorCaptured) {
        enableCursor();
        cursorCaptured = false;
    } else if (!menuMode && !cursorCaptured) {
        disableCursor();
        cursorCaptured = true;
    }
}

function drawState(now) {
    beginDrawing();
    clearBackground(new Color(18, 24, 30, 255));

    if (gameState === STATE_PLAYING || gameState === STATE_PAUSED || gameState === STATE_GAMEOVER) {
        drawWorld(now);
        drawHUD();
    }

    if (gameState === STATE_MENU) drawMenu();
    if (gameState === STATE_PAUSED) drawPause();
    if (gameState === STATE_GAMEOVER) drawGameOver();

    endDrawing();
}

function drawWorld(now) {
    beginMode3D(camera);

    drawPlane(new Vector3(0, 0, 0), new Vector2(ARENA_HALF * 2, ARENA_HALF * 2), new Color(35, 38, 44, 255));
    drawGrid(44, 1.0);

    for (let i = 0; i < walls.length; i++) {
        const w = walls[i];
        drawCube(w.center, w.size.x, w.size.y, w.size.z, new Color(45, 65, 88, 255));
        drawCubeWires(w.center, w.size.x, w.size.y, w.size.z, new Color(85, 120, 155, 255));
    }

    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        drawCube(o.center, o.size.x, o.size.y, o.size.z, o.color);
        drawCubeWires(o.center, o.size.x, o.size.y, o.size.z, new Color(15, 18, 22, 255));
    }

    for (let i = 0; i < pickups.length; i++) {
        const p = pickups[i];
        const bobY = 0.35 + Math.sin(p.bob) * 0.12;
        const c = p.type === "ammo" ? GOLD : LIME;
        drawCube(new Vector3(p.position.x, bobY, p.position.z), 0.5, 0.5, 0.5, c);
        drawCubeWires(new Vector3(p.position.x, bobY, p.position.z), 0.5, 0.5, 0.5, WHITE);
    }

    for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        const healthRatio = clamp(e.hp / (hardMode ? 52 + Math.floor((wave - 1) * 5.3) : 42 + Math.floor((wave - 1) * 5.3)), 0, 1);
        const baseColor = colorLerp(new Color(90, 30, 30, 255), new Color(235, 70, 70, 255), healthRatio);
        const flash = clamp(e.hitFlash * 4, 0, 1);
        const col = colorLerp(baseColor, WHITE, flash);

        drawCube(e.position, 0.8, 1.6, 0.8, col);
        drawCubeWires(e.position, 0.8, 1.6, 0.8, BLACK);
        drawSphere(new Vector3(e.position.x, e.position.y + 1.0, e.position.z), 0.15, BLACK);
    }

    for (let i = 0; i < enemyProjectiles.length; i++) {
        const p = enemyProjectiles[i];
        drawSphere(p.position, 0.08, ORANGE);
    }

    for (let i = 0; i < tracers.length; i++) {
        const t = tracers[i];
        drawLine3D(t.from, t.to, YELLOW);
    }

    endMode3D();
}

function drawHUD() {
    const panelColor = fade(BLACK, 0.45);
    drawRectangle(12, 12, 320, 108, panelColor);
    drawRectangleLines(12, 12, 320, 108, fade(SKYBLUE, 0.6));

    const healthRatio = player.health / player.maxHealth;
    drawText("HEALTH", 24, 24, 20, LIGHTGRAY);
    drawRectangle(24, 52, 220, 22, fade(DARKGRAY, 0.8));
    drawRectangle(24, 52, Math.floor(220 * healthRatio), 22, healthRatio > 0.35 ? LIME : RED);
    drawText(`${Math.ceil(player.health)}/${player.maxHealth}`, 252, 52, 20, WHITE);

    drawText(`AMMO ${player.clip}/${player.reserve}`, 24, 82, 24, GOLD);
    drawText(`WAVE ${Math.max(1, wave - 1)}  KILLS ${player.kills}  SCORE ${player.score}`, 24, 108, 18, RAYWHITE);

    if (player.reloadTimer > 0) {
        const r = 1.0 - player.reloadTimer / player.reloadDuration;
        drawRectangle(24, 138, 180, 12, fade(DARKGRAY, 0.8));
        drawRectangle(24, 138, Math.floor(180 * r), 12, SKYBLUE);
        drawText("RELOADING", 212, 134, 18, SKYBLUE);
    }

    // Crosshair
    const cx = Math.floor(getScreenWidth() / 2);
    const cy = Math.floor(getScreenHeight() / 2);
    const spread = 8 + Math.floor(player.recoil * 10);
    const crossColor = hitMarkerTimer > 0 ? GOLD : WHITE;
    drawLine(cx - spread - 10, cy, cx - spread, cy, crossColor);
    drawLine(cx + spread, cy, cx + spread + 10, cy, crossColor);
    drawLine(cx, cy - spread - 10, cx, cy - spread, crossColor);
    drawLine(cx, cy + spread, cx, cy + spread + 10, crossColor);

    if (hitMarkerTimer > 0) {
        drawLine(cx - 10, cy - 10, cx - 4, cy - 4, GOLD);
        drawLine(cx + 10, cy - 10, cx + 4, cy - 4, GOLD);
        drawLine(cx - 10, cy + 10, cx - 4, cy + 4, GOLD);
        drawLine(cx + 10, cy + 10, cx + 4, cy + 4, GOLD);
    }

    if (messageTimer > 0) {
        drawText(messageText, cx - measureText(messageText, 24) / 2, cy + 44, 24, GOLD);
    }

    drawMinimap();

    if (player.hurtFlash > 0) {
        drawRectangle(0, 0, getScreenWidth(), getScreenHeight(), fade(RED, player.hurtFlash * 0.28));
    }
}

function drawMinimap() {
    drawRectangleRec(MAP_PANEL, fade(BLACK, 0.55));
    drawRectangleLinesEx(MAP_PANEL, 2, fade(WHITE, 0.55));

    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        const a = worldToMap(new Vector3(o.min.x, 0, o.min.z));
        const b = worldToMap(new Vector3(o.max.x, 0, o.max.z));
        const rx = Math.min(a.x, b.x);
        const ry = Math.min(a.y, b.y);
        const rw = Math.abs(a.x - b.x);
        const rh = Math.abs(a.y - b.y);
        drawRectangle(rx, ry, rw, rh, fade(SKYBLUE, 0.35));
    }

    for (let i = 0; i < enemies.length; i++) {
        const p = worldToMap(enemies[i].position);
        drawCircle(Math.floor(p.x), Math.floor(p.y), 3, RED);
    }

    for (let i = 0; i < pickups.length; i++) {
        const p = worldToMap(pickups[i].position);
        drawCircle(Math.floor(p.x), Math.floor(p.y), 2, pickups[i].type === "ammo" ? GOLD : LIME);
    }

    const playerMap = worldToMap(camera.position);
    drawCircle(Math.floor(playerMap.x), Math.floor(playerMap.y), 4, GREEN);

    const dir = vector3Normalize(vector3Subtract(camera.target, camera.position));
    drawLine(
        Math.floor(playerMap.x),
        Math.floor(playerMap.y),
        Math.floor(playerMap.x + dir.x * 12),
        Math.floor(playerMap.y + dir.z * 12),
        GREEN
    );

    drawText("RADAR", Math.floor(MAP_PANEL.x + 8), Math.floor(MAP_PANEL.y + 8), 18, RAYWHITE);
}

function worldToMap(v) {
    const u = (v.x + ARENA_HALF) / (ARENA_HALF * 2);
    const w = (v.z + ARENA_HALF) / (ARENA_HALF * 2);
    return new Vector2(
        MAP_PANEL.x + u * MAP_PANEL.width,
        MAP_PANEL.y + w * MAP_PANEL.height
    );
}

function drawMenu() {
    const box = new Rectangle(SCREEN_WIDTH / 2 - 210, SCREEN_HEIGHT / 2 - 200, 420, 380);
    guiPanel(box, "RAYJS FPS BINDING STRESS TEST");

    guiLabel(new Rectangle(box.x + 26, box.y + 50, 360, 22), "A pure-JS FPS demo for binding robustness");
    guiLabel(new Rectangle(box.x + 26, box.y + 74, 360, 22), "Features: AI, waves, shooting, pickups, UI, minimap");

    hardMode = guiCheckBox(new Rectangle(box.x + 26, box.y + 112, 20, 20), "Hard Mode (+damage/+hp)", hardMode);

    if (guiButton(new Rectangle(box.x + 26, box.y + 154, 368, 44), "START MISSION")) {
        resetGame();
        gameState = STATE_PLAYING;
        setMenuCursor(false);
    }

    if (guiButton(new Rectangle(box.x + 26, box.y + 208, 368, 38), "HOW TO PLAY")) {
        messageText = "WASD move | Mouse aim | LMB fire | R reload | ESC pause";
        messageTimer = 2.0;
    }

    if (guiButton(new Rectangle(box.x + 26, box.y + 256, 368, 38), "QUIT")) {
        quitRequested = true;
    }

    drawText("WASD move, mouse look, left-click shoot, R reload", Math.floor(box.x + 26), Math.floor(box.y + 316), 18, LIGHTGRAY);
    drawText("ESC for pause menu", Math.floor(box.x + 26), Math.floor(box.y + 340), 18, LIGHTGRAY);
}

function drawPause() {
    drawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, fade(BLACK, 0.55));
    const box = new Rectangle(SCREEN_WIDTH / 2 - 180, SCREEN_HEIGHT / 2 - 130, 360, 260);
    guiPanel(box, "PAUSED");

    guiLabel(new Rectangle(box.x + 24, box.y + 52, 300, 20), "Wave " + Math.max(1, wave - 1) + " | Enemies: " + enemies.length);

    if (guiButton(new Rectangle(box.x + 24, box.y + 86, 312, 40), "RESUME")) {
        gameState = STATE_PLAYING;
        setMenuCursor(false);
    }
    if (guiButton(new Rectangle(box.x + 24, box.y + 136, 312, 40), "RESTART")) {
        resetGame();
        gameState = STATE_PLAYING;
        setMenuCursor(false);
    }
    if (guiButton(new Rectangle(box.x + 24, box.y + 186, 312, 40), "BACK TO MENU")) {
        gameState = STATE_MENU;
        setMenuCursor(true);
    }
}

function drawGameOver() {
    drawRectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, fade(BLACK, 0.6));
    const box = new Rectangle(SCREEN_WIDTH / 2 - 220, SCREEN_HEIGHT / 2 - 170, 440, 340);
    guiPanel(box, "MISSION FAILED");

    drawText("You were overrun.", Math.floor(box.x + 24), Math.floor(box.y + 56), 30, RED);
    drawText(`Waves Survived: ${Math.max(1, wave - 1)}`, Math.floor(box.x + 24), Math.floor(box.y + 104), 24, WHITE);
    drawText(`Kills: ${player.kills}`, Math.floor(box.x + 24), Math.floor(box.y + 136), 24, WHITE);
    drawText(`Score: ${player.score}`, Math.floor(box.x + 24), Math.floor(box.y + 168), 24, WHITE);

    if (guiButton(new Rectangle(box.x + 24, box.y + 218, 392, 42), "TRY AGAIN")) {
        resetGame();
        gameState = STATE_PLAYING;
        setMenuCursor(false);
    }
    if (guiButton(new Rectangle(box.x + 24, box.y + 270, 392, 42), "BACK TO MENU")) {
        gameState = STATE_MENU;
        setMenuCursor(true);
    }
}

function randf(min, max) {
    return min + (getRandomValue(0, 100000) / 100000) * (max - min);
}

function clamp(v, min, max) {
    return v < min ? min : (v > max ? max : v);
}
