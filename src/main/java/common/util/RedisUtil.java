package common.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * redis
 * @author yohoyes
 */
public class RedisUtil {
    private static String ip="localhost";
    private static int port=6379;
    private static int timeout=10000;
    private static JedisPool pool=null;


    static{
        JedisPoolConfig config=new JedisPoolConfig();
        //最大连接数
        config.setMaxTotal(1024);
        //最大空闲实例数
        config.setMaxIdle(200);
        //等连接池给连接的最大时间，毫秒
        config.setMaxWaitMillis(10000);
        config.setTestOnBorrow(true);

        pool=new JedisPool(config,ip,port,timeout);

    }

    /**
     * 得到redis连接
     * @return
     */
    public static Jedis getJedis(){
        if(pool!=null){
            return pool.getResource();
        }else{
            return null;
        }
    }

    /**
     * 关闭redis连接
     * @param redis
     */
    public static void close(final Jedis redis){
        if(redis != null){
            redis.close();
        }
    }
}
