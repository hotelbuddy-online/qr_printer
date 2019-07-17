export default [
    {
        name: 'justQrCodes',
        options: [],
        main: true,
        rooms: true,
    },
    {
        name: 'mainCode',
        main: true,
        options: [
            {
                name: 'reception',
                templates: [
                    {
                        name: 'reception summary - english',
                        file: 'reception summary - english.png',
                        sizes: ['A4', 'A5', 'letter', 'half letter'],
                        width: 858,
                        viewer: 'image',
                        overlays: [
                            {
                                type: 'logo',
                                left: 215,
                                top: 20,
                                width: 415,
                                height: 415,
                            },
                            {
                                type: 'qrCode',
                                left: 288,
                                top: 876,
                                width: 255,
                                height: 255,
                            },
                        ]
                    },
                    {
                        name: 'reception summary - vietnamese',
                        file: 'reception summary - vietnamese',
                        overlays: [
                            {
                                type: 'logo',
                                x1: 20,
                                y1: 20,
                                x2: 100,
                                y2: 100
                            },
                            {
                                type: 'qrCode',
                                x1: 220,
                                y1: 220,
                                x2: 300,
                                y2: 300
                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        name: 'roomsOrBeds',
        rooms: true,
        options: [
            {
                name: 'keyfobs',
                sizes: ['credit card'],
                templates: [
                    {
                        name: 'reception summary - english',
                        file: 'reception summary - english.pdf',
                        viewer: 'pdf',
                        overlays: [
                            {
                                type: 'logo',
                                x1: 20,
                                y1: 20,
                                x2: 100,
                                y2: 100
                            },
                            {
                                type: 'qrCode',
                                x1: 220,
                                y1: 220,
                                x2: 300,
                                y2: 300
                            },
                        ]
                    }
                ]
            },
            {
                name: 'bedside',
                templates: [
                    {
                        name: 'bedside 1 - english',
                        file: 'bedside 1 - english.png',
                        sizes: ['custom'],
                        width: 6,
                        height: 12,
                        viewer: 'image',
                        overlays: [
                            {
                                type: 'logo',
                                x1: 20,
                                y1: 20,
                                x2: 100,
                                y2: 100
                            },
                            {
                                type: 'qrCode',
                                x1: 220,
                                y1: 220,
                                x2: 300,
                                y2: 300
                            },
                        ]
                    }
                ]
            },
        ]
    }
]