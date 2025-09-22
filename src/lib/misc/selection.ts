class Selection { 
    private static zoneSelected: number = 1035;
    private static subscriptions: ((value: number) => void)[];
    public static SetZoneSelection = (zoneId: number) => {
        Selection.zoneSelected = zoneId;
        Selection.subscriptions?.forEach(sub => sub(zoneId));
    }
    public static AddSubscription = (callback: (value: number) => void) => {
        if (!Selection.subscriptions) {
            Selection.subscriptions = [];
        }
        Selection.subscriptions.push(callback);
        callback(Selection.zoneSelected);
    }
    public static GetZoneSelection = () => Selection.zoneSelected;
}

export { Selection as default };