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
                        require: 'reception summary - english.pdf',
                        sizes: ['A4', 'A5', 'letter', 'half letter'],
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
                    },
                    {
                        name: 'reception summary - vietnamese',
                        require: 'reception summary - vietnamese',
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
                        require: 'reception summary - english.pdf',
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
                        require: 'bedside 1 - english.png',
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