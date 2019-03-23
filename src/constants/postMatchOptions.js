export const position = {
    name: "pos",
    label: "Final Position",
    options: [
        {
            label: "No HAB",
            value: 0,
            points: 0
        },
        {
            label: "Lvl 1",
            value: 1,
            points: 3
        },
        {
            label: "Lvl 2",
            value: 2,
            points: 6
        },
        {
            label: "Lvl 3",
            value: 3,
            points: 12
        }
    ]
};

export const buddyClimbs = {
    name: "host",
    label: "Did they host?",
    options: [
        {
            label: "🤖x0",
            value: 0,
        },
        {
            label: "🤖x1",
            value: 1,
        },
        {
            label: "🤖x2",
            value: 2,
        }
    ]
};

// export const liftability = {
//     name: "liftability",
//     label: "Liftability",
//     options: [
//         {
//             label: "Bad",
//             value: 0,
//         },
//         {
//             label: "Meh",
//             value: 1,
//         },
//         {
//             label: "Good",
//             value: 2,
//         }
//     ]
// };

export const defense = {
    name: "defense",
    label: "Defense",
    options: [
        {
            label: "None",
            value: 0,
        },
        {
            label: "Bad",
            value: 1,
        },
        {
            label: "Good",
            value: 2,
        }
    ]
};

export const broken = {
    name: "broken",
    label: "Broken?",
    options: [
        {
            label: "🚫📡",
            value: 0,
        },
        {
            label: "💀",
            value: 1,
        },
        {
            label: "🤕",
            value: 2,
        },
        {
            label: "🙂",
            value: 3,
        }
    ]
};

export const defendedOn = {
    name: "defendedOn",
    label: "Where they defended on?",
    options: [
        {
            label: "No",
            value: 0,
        },
        {
            label: "Kinda",
            value: 1,
        },
        {
            label: "Heavily",
            value: 2,
        }
    ]
};