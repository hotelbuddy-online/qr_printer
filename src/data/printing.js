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
                sizes: ['A4', 'A5', 'letter', 'half letter'],
                templates: [
                    {
                        name: 'reception summary - english',
                        require: 'reception summary - english',
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
                sizes: ['credit card', '50mm x 50mm'],
                templates: [
                    'keyfob 1',
                    'keyfob 2',
                ]
            }
        ]
    }
]