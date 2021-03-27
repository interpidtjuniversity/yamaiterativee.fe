// eslint-disable-next-line import/no-anonymous-default-export
export default {
    nodes: [
        {
            stageId_execId: '1_1',
            stageId: '1',
            execId: '1',
            id: '1',
            label: '代码评审',
            className: 'icon-background-color',
            iconType: 'icon-kaifa',
            top: 55,
            left: 50,
            group: 'group',
            endpoints: [{
                id: '1_right',
                orientation: [1, 0],
                pos: [0, 0.5],
            }]
        },
        {
            stageId_execId: '2_1',
            stageId: '2',
            execId: '1',
            id: '2',
            label: '冲突检测',
            className: 'icon-background-color',
            iconType: 'icon-kaifa',
            top: 125,
            left: 50,
            group: 'group',
            endpoints: [
                {
                    id: '2_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                }
            ]
        },
        {
            stageId_execId: '3_1',
            stageId: '3',
            execId: '1',
            id: '3',
            label: '代码扫描',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 125,
            left: 225,
            group: 'group',
            endpoints: [
                {
                    id: '3_left',
                    orientation: [-1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '3_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                }
            ]
        },
        {
            stageId_execId: '4_1',
            stageId: '4',
            execId: '1',
            id: '4',
            label: '预编译',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 125,
            left: 400,
            group: 'group',
            endpoints: [
                {
                    id: '4_left',
                    orientation: [-1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '4_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                }
            ]
        },
        {
            stageId_execId: '5_1',
            stageId: '5',
            execId: '1',
            id: '5',
            label: '合并',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 125,
            left: 575,
            group: 'group',
            endpoints: [
                {
                    id: '5_left',
                    orientation: [-1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '5_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '5_top',
                    orientation: [0, -1],
                    pos: [0.5, 0],
                }
            ]
        },
        {
            stageId_execId: '6_1',
            stageId: '6',
            execId: '1',
            id: '6',
            label: '合并后编译',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 125,
            left: 750,
            group: 'group',
            endpoints: [
                {
                    id: '6_left',
                    orientation: [-1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '6_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                }
            ]
        },
        {
            stageId_execId: '7_1',
            stageId: '7',
            execId: '1',
            id: '7',
            label: '质量检测',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 125,
            left: 925,
            group: 'group',
            endpoints: [{
                id: '7_left',
                orientation: [-1, 0],
                pos: [0, 0.5],
            }]
        },

    ],
    edges: [
        {
            source: '1_right',
            target: '5_top',
            sourceNode: '1',
            targetNode: '5',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
            shapeType: 'Flow'
        },
        {
            source: '2_right',
            target: '3_left',
            sourceNode: '2',
            targetNode: '3',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
        },
        {
            source: '3_right',
            target: '4_left',
            sourceNode: '3',
            targetNode: '4',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
        },
        {
            source: '4_right',
            target: '5_left',
            sourceNode: '4',
            targetNode: '5',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
        },
        {
            source: '5_right',
            target: '6_left',
            sourceNode: '5',
            targetNode: '6',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
        },
        {
            source: '6_right',
            target: '7_left',
            sourceNode: '6',
            targetNode: '7',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
        },
    ],
    groups: [{
        id: 'group',
        options: {
            title: 'E123456789_zqf0304_dev -> E123456789_20210304'
        },
        draggable:false,
        top: 0,
        left: 130,
        width: 1100,
        height: 225,
        resize: false
    }],
};
