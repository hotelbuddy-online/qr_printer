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
                        sizes: ['A4', 'A5', 'letter', 'half letter', 'legal', 'half legal'],
                        itemsPerRow: 1,
                        rowsPerPage: 1,
                        width: 858,
                        overlays: [
                            {
                                type: 'image',
                                file: 'reception summary - english.png',
                                style: {
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                },
                            },
                            {
                                type: 'logo',
                                style: {
                                    left: '50%',
                                    top: '7%',
                                    width: '40%',
                                    height: 'auto',
                                    transform: 'translate(-50%, 0)',
                                },
                            },
                            {
                                type: 'qrCode',
                                style: {
                                    left: '50%',
                                    top: '71%',
                                    width: '40%',
                                    height: 'auto',
                                    transform: 'translate(-50%, 0)',
                                },
                            },
                        ]
                    },
                    {
                        name: 'reception summary - vietnamese',
                        file: 'reception summary - vietnamese',
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
                                left: 215,
                                top: 20,
                                width: 415,
                                height: 415,
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
                templates: [
                    {
                        name: 'keycard logo and qr',
                        sizes: ['credit card'],
                        itemsPerRow: 2,
                        rowsPerPage: 5,
                        style: {
                            border: '1px solid green'
                        },
                        // file: 'reception summary - english.pdf',
                        // viewer: 'pdf',
                        overlays: [
                            {
                                type: 'logo',
                                style: {
                                    left: '0px',
                                    top: '0px',
                                    width: '194px',
                                    height: '206px',
                                }
                            },
                            {
                                type: 'qrCode',
                                style: {
                                    left: '204px',
                                    top: '11px',
                                    width: '107px',
                                    height: '107px',
                                }
                            },
                            {
                                type: 'text',
                                text: ['Room:{room}', 'Bed:{bed}'],
                                textStyle: {
                                    fontSize: '20px',
                                    textAlign: 'center',
                                },
                                style: {
                                    left: '204px',
                                    top: '131px',
                                    width: '107px',
                                    height: '73px',
                                },
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