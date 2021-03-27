// eslint-disable-next-line import/no-anonymous-default-export
export default {
    nodes: [
        {
            stageId_execId: '8_1',
            stageId: '8',
            execId: '1',
            id: '1',
            label: '机器变更',
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
            stageId_execId: '9_1',
            stageId: '9',
            execId: '1',
            id: '2',
            label: '镜像构建',
            className: 'icon-background-color',
            iconType: 'icon-kaifa',
            top: 55,
            left: 300,
            group: 'group',
            endpoints: [
                {
                    id: '2_left',
                    orientation: [-1, 0],
                    pos: [0, 0.5],
                },
                {
                    id: '2_right',
                    orientation: [1, 0],
                    pos: [0, 0.5],
                }
            ]
        },
        {
            stageId_execId: '10_1',
            stageId: '10',
            execId: '1',
            id: '3',
            label: '发布',
            className: 'icon-background-color',
            iconType: 'icon-guanlian',
            top: 55,
            left: 550,
            group: 'group',
            endpoints: [{
                id: '3_left',
                orientation: [-1, 0],
                pos: [0, 0.5],
            }]
        },
    ],
    edges: [
        {
            source: '1_right',
            target: '2_left',
            sourceNode: '1',
            targetNode: '2',
            arrow: true,
            type: 'endpoint',
            arrowPosition: 0.5,
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
    ],
    groups: [{
        id: 'group',
        options: {
            title: '张启帆 申请了服务器 E987654321\n' +
                '\n' +
                '3天前'
        },
        draggable:false,
        top: 0,
        left: 130,
        width: 750,
        height: 150,
        resize: false
    }],
};
