//  SENARIO: 
//  - Robot was holding a Hatch.  User presses r1, but meant to press r2

// before Undoing:
let state = {
    carrying: null,
    lastAction: "r1",       // this needs to change
    undoing: false,
    events: [
        {
            type: "h_",
            time: 2000
        },
        {
            type: "h_r1",   // this needs to change
            time: 5000
        }
    ]
};


// During 
let state = {
    carrying: "h_",         // just in case the user needs to switch
    lastAction: null,       // null so no buttons say UNDO
    undoing: true,          // toggles to true
    events: [
        {
            type: "h_",
            time: 2000
        },
        {
            type: "h_r1",   // doesn't need to change *yet*
            time: 5000      // won't change
        }
    ]
};


// After
let state = {
    carrying: null,
    lastAction: "r2",
    undoing: false,
    events: [
        {
            type: "h_",
            time: 2000
        },
        {
            type: "h_r2",
            time: 5000
        }
    ]
}
// ------------------------------------------------------------------




// SENARIO:
// - Robot is holding a hatch, but User pressed Cargo

// before Undoing:
let state = {
    carrying: "c_",
    lastAction: "c_",
    undoing: false,
    events: [
        {
            type: "c_",
            time: 2000
        }
    ]
};

// NO DURING


// After
let state = {
    carrying: "h_",
    lastAction: "h_",
    undoing: false,
    events: [
        {
            type: "h_",
            time: 2000
        }
    ]
}