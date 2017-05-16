public class ThreadSafeSingleton {

    private static final Object instance = new Object();
    //The above runs at class load time so we are good

    protected ThreadSafeSingleton() {
    }

    // Runtime initialization
    // By defualt ThreadSafe
    public static Object getInstance() {
        return instance;
    }
}
