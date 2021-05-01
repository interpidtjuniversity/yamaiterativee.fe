export default [
    {
        "applicationName":"linke",
        "branchName":"--",
        "ip":"192.168.10.2",
        "serverName":"linke-dev-1001",
        "env":"dev",
        "owner":"chiling.cy",
        // 正在申请中
        "status":"applying",
        "applyTime":"2020-04-21-12:00:00",
        "index":0
    },
    {
        "applicationName":"eyes",
        "branchName":"--",
        "serverName":"eyes-dev-1001",
        "ip":"192.168.11.2",
        "env":"dev",
        "owner":"chiling.cy",
        // 空闲中, 未部署应用
        "status":"idle",
        "applyTime":"2020-04-21-12:00:00",
        "index":1,
    },
    {
        "applicationName":"pig",
        "branchName":"master",
        "serverName":"pig-dev-1001",
        "ip":"192.168.12.2",
        "env":"dev",
        // 正在运行中
        "status":"applying",
        "owner":"chiling.cy",
        "applyTime":"2020-04-21-12:00:00",
        "index":2,
    },
    {
        "applicationName":"dag",
        "branchName":"--",
        "serverName":"dag-dev-1001",
        "ip":"192.168.13.2",
        "env":"dev",
        // 已停止
        "status":"stopped",
        "owner":"chiling.cy",
        "applyTime":"2020-04-21-12:00:00",
        "index":3,
    },
]