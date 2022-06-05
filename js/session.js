/*jshint esversion: 10, -W030, -W032, -W033, -W083, -W084*/
/**************************************************
 **                                              **
 **              PATTERNIFY FLEX                 **
 **  __________________________________________  **
 **      Original Version by Sascha Greif        **
 **       Enhancements to "FLEX" version         **
 **       (c) 2020/21 by Manuel Pelzer           **
 ** ___________________________________________  **
 **  session.js                                  **
 **************************************************/

let offTime, drawUserId, newGrid;
const sessionMessage = {
    cache: ["", "", "", ""],
    add(msg) {
        typeof msg !== "object" && (msg = [msg]);
        this.cache.push(...msg);
        this.cache = this.cache.slice(this.cache.length - 5, this.cache.length);
        let w = width(get(".flash", 1)[0]), d = new Date(Date.now()), time = [];
        [d.getHours(), d.getMinutes(), d.getSeconds()].forEach(e => time.push(e.toString().length == 1 ? "0" + e : e));
        time = time.join(":");
        msg = [];
        for (let i = 0; i < 5; i++) msg[i] = `<span style="text-align:right;padding-right:10px;vertical-align:top">${this.cache[i] ? time : ""}</span><span style="text-align:left;vertical-align:top">${this.cache[i]}</span>`;
        flashMsg.innerHTML = msg.join("");
    },
    open() {
        flashMsg.classList.add("session-message");
        $(flashMsg).slideDown(400);
    },
    close() {
        setTimeout(() => {
            $(".flash").css("display", "block").slideUp(400).delay(1000).removeClass("session-message").html("");
        }, 3000);
    },
    isOpen() {
        return getComputedStyle(flashMsg).display !== "none";
    }
},

logg = function(...args){
	if (!sessionMessage.isOpen()) sessionMessage.open();
	sessionMessage.add(...args);
},

startSession = function(){
	if (offTime && Date.now() < offTime) return;
	[].forEach.call(get("*"), e => e.dataset.select = getComputedStyle(e).userSelect && (e.style.userSelect = "auto"));
	onlineSession = Rec.isRec = 1;
	sessionButtonB.value = str.stopOnlineSession;
	sessionButtonB.removeEventListener("mouseup", startSession);
	sessionButtonB.addEventListener("mouseup", stopSession);
	setBase64Field({
		codeHead: "Online Session",
		buttonVisible: 0,
		codeTopHtml: "<b>" + str.liveMessages + "</b>",
		codeBottomHtml: "",
		content: ($ession && $ession.wasConnected ? base64Code.value : ""),
		readonly: 0,
		css: { var: "height", val: "185px" }
	});
	if ($ession && $ession.wasConnected) return $ession.reconnect();
	$ession = new Session();
	preventReconnect();
	$ession.start();
},

stopSession = function(e){
	sessionMessage.close();
	if (offTime && Date.now() < offTime) return;
	[].forEach.call(get("*"), e => e.style.userSelect = e.dataset.select && delete e.dataset.select);
	get("html")[0].style.userSelect = "none";
	preventReconnect();
	onlineSession = Rec.isRec = 0;
	$ession && $ession.stop(e === 1 ? 1 : null);
	e === 1 || logg(str.databaseConnectionTerminated);
	sessionButtonB.value = str.startOnlineSession;
	sessionButtonB.removeEventListener("mouseup", stopSession);
	sessionButtonB.addEventListener("mouseup", startSession);
	clear("move");
	Keys.prevent();
	setBase64Field({
		codeHead: codeHeadline[0][0],
		buttonVisible: 1,
		codeTopHtml: codeTopHtml[0],
		codeBottomHtml: codeBottomHtml[0],
		readonly: 1,
		css: { var: "height", val: "130px" }
	});
},

preventReconnect = function() {
	return (offTime = Date.now() + 1000);
},

currentGrid = function() {
	let grid = [0, [JSON.stringify({
		matrix, xcursor, ycursor, pixelsX, pixelsY,
		rgb: color,
		text: base64Code.value
	})], $ession.db.userId];
	return grid;
},

getUserName = function(name) {
	let chosenName = prompt(str.enterYourName, name || "");
	chosenName === "" && (
		chosenName = function() {
			return str.names[Math.floor(Math.random() * str.names.length)];
		}()
	);
	return chosenName;
};

class Session {
	constructor(id) {
		if (!this.root) {
			let base;
			eval(atob("YmFzZT17YXBpS2V5OiAiQUl6YVN5QnhtWHZyV3k3azBxSVhYeGJYUFZ2cGhqaHU0Mnl5ZE13IixhdXRoRG9tYWluOiAibXAtZXJzdGUtYmFzZS5maXJlYmFzZWFwcC5jb20iLGRhdGFiYXNlVVJMOiAiaHR0cHM6Ly9tcC1lcnN0ZS1iYXNlLWRlZmF1bHQtcnRkYi5ldXJvcGUtd2VzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHAiLHByb2plY3RJZDogIm1wLWVyc3RlLWJhc2UiLHN0b3JhZ2VCdWNrZXQ6ICIiLG1lc3NhZ2luZ1NlbmRlcklkOiAiOTExMTMyNDc5NjI4In0="));
			firebase.initializeApp(base);
			this.root = firebase.database().ref("/");
		}
		this.db = load("firebaseSession") ? JSON.parse(load("firebaseSession")) : {};
		this.userList = [];
		this.wasConnected = 0;
		id = id || prompt(str.nameOfSession, this.db.sessionId || "");
		if (id == null) return stopSession(1);
		this.session = id ? this.root.child(id) : this.root.push();
		this.db.sessionId = this.session.key;

		save("firebaseSession", JSON.stringify(this.db));
	}

	start() {
		let user = {};

		if ((user.name = getUserName(this.db.userName)) == null) return stopSession(1);
		this.db.userName = user.name;

		this.grid = this.session.child("grid");
		this.item = this.session.child("item");
		this.users = this.session.child("users");

		this.user = (this.db.userId ? this.users.child(this.db.userId) : this.users.push());
		user.id = this.db.userId = this.user.key;

		this.user.onDisconnect().remove();
		this.user.set(user);

		save("firebaseSession", JSON.stringify(this.db));
		logg(str.databaseConnectionEstablished);
        logg("User: <i style='color: yellow; font-weight: 700'>" + user.name + "</i>, Session: <i style='color: yellow; font-weight: 700'>" + this.db.sessionId + "</i>");

		this.getGrid();

		this.users.on("child_added", this.addUser);
		this.item.on("value", this.receiveItem);

		this.interval = setInterval($ession.updateSessionGrid, 15000);
		Keys.prevent();
	}

	stop(e) {
		firebase.database().goOffline();
		clearInterval($ession.interval);
		e ? logg(str.abortedByUser) : $ession.wasConnected = 1;
	}

	getGrid() {
		$ession.grid.get().then(grid => {
			let item = grid.val(), hex;
			item && (
				item = JSON.parse(item[1]),
				item.drawId = 1,
				drawUserId = 1,
				hex = rgbToHex(item.rgb),
			    $(".color-preview").spectrum("set", item.rgb),
			    color = item.rgb,
			    colorpicker.value = hex,
			    colorPreview.style.backgroundColor = "#" + hex,
			    colorPreview.style.opacity = item.rgb.a,
				opacity.value = parseInt(item.rgb.a * 100),
			    $("#slider").slider("value", item.rgb.a * 100),
				setTimeout(() => {base64Code.value = item.text;}, 200),
				resizeGrid(item)
			);
		});
	}

	reconnect() {
		firebase.database().goOnline();
		logg(str.reconnected);
		this.user.set({name: this.db.userName, id: this.db.userId});
		this.interval = setInterval($ession.updateSessionGrid, 5000);
		this.getGrid();
	}

	sendDrawing(item) {
		item[0] === 8 ? (
			temp.moveTimeout && clearTimeout(temp.moveTimeout),
			temp.moveTimeout = setTimeout(() => {
				temp.moveTimeout = null;
				$ession.item.set([2, [JSON.stringify({matrix, xcursor, ycursor})], $ession.db.userId]);
			}, 500)
		) : $ession.item.set([...item, $ession.db.userId]);
	}

	addUser(user) {
		$ession.newUser = user.val();
		$ession.newUserRef = user.ref;
		$ession.userList.indexOf(user.key) > -1 || $ession.userList.push(user.key, $ession.newUser.name);
		logg((user.key == $ession.db.userId ? str.youHave : $ession.newUser.name + " ") + str.joinedTheSession);
		if (user.key == $ession.db.userId) return;
		$ession.updateSessionGrid();
		$ession.newUserRef.on("value", newUser => {
			let name = $ession.userList[$ession.userList.indexOf(newUser.key) + 1];
			!newUser.val() && (
				$ession.newUserRef.off(),
				logg(name + str.hasLeftTheSession),
				$ession.userList.splice($ession.userList.indexOf(newUser.key), 2)
			);
		});
	}

	receiveItem(item) {
		if (!$ession.newItem) return ($ession.newItem = 1);
		$ession.newItem = item.val();
		if ($ession.newItem === null || $ession.newItem[2] === $ession.db.userId) return;
		logg($ession.userList[$ession.userList.indexOf($ession.newItem[2]) + 1] + ": " + Rec.modes[$ession.newItem[0]]);
		drawUserId = $ession.newItem[2] || $ession.db.userId;
		executeItem($ession.newItem);
	}

	updateSessionGrid() {
		$ession.users.get(0).then(users => {
			let userList = Object.keys(users.val());
			userList.indexOf($ession.db.userId) == 0 && (
				$ession.grid.set(currentGrid())
			);
		});
	}

	kill() {
        stopSession();
		this.item.off();
		this.grid.off();
		this.users.off();
		["$ession", "session", "root", "users", "user", "grid", "newGrid", "item", "newItem", "wasConnected"].forEach(e => delete this[e]);
	}
}

executeItem = function(action){
	let mode = action[0], item = action[1];
	switch (mode) {
		case 0:
			item = JSON.parse(item[0]);
			colorSubmit(item.rgb);
			base64Code.value = item.text;
			resizeGrid(item);
			break;
		case 1:
			// SINGLE PIXEL
			drawPixel({ xc: item[0], yc: item[1] }, item[2] ? [ color.r, color.g, color.b, color.a ] : 0);
			break;
		case 2:
			// WHOLE PATTERN
			item = JSON.parse(item[0]);
			loadGrid(item, 1);
			break;
		case 3:
			// X AND Y CURSORS
			setCursors(item[0], item[1], 1);
			break;
		case 4:
			// MOVE CURSOR
			drawPosition({ xc: item[0], yc: item[1] });
			break;
		case 5:
			// CALL JQUERY
			item[0] = item[0].replace(/~class~/, ".").replace(/~id~/, "#");
			let query = "$('" + item[0] + "')." + item[1];
			this.bySession = 1;
			try { eval(query); } catch (e) {}
			break;
		case 6:
		case 7:
		case 13:
			// RECTANGLE, LINE, ELLIPSE
			drawObject = { from: { xc: item[0], yc: item[1] }, finish: item[2], eraser: item[3] };
			if (typeof item[4] === "number") drawObject.to = { xc: item[4], yc: item[5] };
			drawObject.filled = item[6];
			switch (mode) {
				case 6: drawRectangle(); break;
				case 7: drawLine(); break;
				case 13: drawEllipse(); break;
			}
			break;
		case 8:
			// MOVE GRID
			if (xcursor < pixelsX || ycursor < pixelsY) setCursors(pixelsX, pixelsY);
			matrix = moveGrid(item[0]);
			refreshGrid();
			break;
		case 9:
			// COLOR PICKER, OPACITY VALUE IN RANGE 0 - 1
			colorSubmit({ r: item[0], g: item[1], b: item[2], a: item[3] });
			break;
		case 10:
			// OPACITY VALUE IN RANGE 0 - 100 %
			moveSlider(item[0]);
			break;
		case 11:
			// TEXT OUTPUT
			let e = get("#" + str.inputFields[1][item[0]]);
			e.focus();
			e.value = item[1];
			break;
		case 12:
			// HIGHLIGHT TOOL
			toolAction(Rec.toolList[1][item[0]], item[1]);
			break;
		case 14:
			// AREAS
			showResize = item[1];
			infoIsOpen = item[2];
			helpIsOpen = item[3];
			keysIsOpen = item[4];
			recordIsOpen = item[5];
			slideArea(item[0] === "x" ? "" : item[0]);
			break;
		case 15:
			// EXECUTE INSTRUCTION
			let code;
			if (item[0] === 9) try { Rec.runMarquee(JSON.parse(item[1])); }
				catch (err) { console.log(err); }
			else {
				if (item[0] === 8 || item[0] === 11) code = Rec.commandList[1][item[0]].replace(/%value%/g, item[1]);
				else if (item[0] === 10) code = item[1].replace(/~id~/g, "#");
				else code = Rec.commandList[1][item[0]];
				try { eval(code); } catch (err) {};
			}
			break;
		case 16:
			// CALL FUNCTION
			if (item[2] === 1) try { item[0](item[1]); } catch (err) {try { Rec[item[0]](item[1]); } catch (err) {}}
			else try {Rec[item[0]](item[1]);} catch (err) {try { window[item[0]](item[1]); } catch (err) {}}
			break;
		case 17:
			// LOAD NEW GRID CONFIGURATION
			try { workMatrix = JSON.parse(item[0]); }
			catch(err) { workMatrix = item[0]; }
			if (workMatrix.constructor != Object) return;
			imgLoad.style.color = "#fff";
			imgLoad.style.backgroundColor = "#292";
			imgWidth.placeholder = workMatrix.pixelsX;
			imgHeight.placeholder = workMatrix.pixelsY;
			if (document.body?.classList?.contains("modal-open")) closeModal(); // jshint ignore:line
			setupGrid();
			break;
		case 18:
			// PARALLELOGRAM
			drawObject = { a: { xc: item[0], yc: item[1] } };
			if (item.length > 2) {
				drawObject.b = { xc: item[2], yc: item[3] };
				drawObject.next = item[4];
			}
			if (item.length > 5) {
				drawObject.c = { xc: item[5], yc: item[6] };
				drawObject.finish = item[7];
			}
			drawParallelogram();
			break;
		case 19:
			// POLYGON
			drawObject.polygon = JSON.parse(item[0]);
			drawObject.finish = item[1];
			drawPolygon();
			break;
			// TEXT MARQUEE / DRAW TEXT
		case 20: case 21:
			let text = drawNewText(item[0], item[2], item[1], 2);
			if (mode === 20) Rec.runMarquee({ matrix: text, pixelsX: text[0].length, pixelsY: text[0].length, marquee: text.length });
			else resizeGrid({ matrix: text, pixelsX: Math.max(pixelsX, text.length), pixelsY: Math.max(pixelsY, text[0].length), xcursor: text.length, ycursor: text[0].length });
			break;
		case 22:
			updateTextArea(item[0], item[1]);
	}
	this.bySession = 0;
	redrawPreview();
};
