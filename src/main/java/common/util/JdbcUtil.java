package common.util;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author yohoyes
 */
public class JdbcUtil {

    private static ThreadLocal<Connection> tol = new ThreadLocal<Connection>();
    private static DataSource ds;

    static {
        try {
            Properties pro = new Properties();
            InputStream is = JdbcUtil.class.getClassLoader().getResourceAsStream("druid.properties");
            pro.load(is);
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static DataSource getDataSource() {
        return ds;
    }


    public static Connection getConnection() {
        Connection conn = tol.get();
        if(conn==null) {
            try {
                conn = ds.getConnection();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            tol.set(conn);
        }
        return conn;
    }

    /**
     * setAutoCommit总的来说就是保持数据的完整性，一个系统的更新操作可能要涉及多张表，需多个SQL语句进行操作
     * 循环里连续的进行插入操作，如果你在开始时设置了：conn.setAutoCommit(false);
     * 最后才进行conn.commit(),这样你即使插入的时候报错，修改的内容也不会提交到数据库，
     */
    public static void startTransaction() {
        try {
            // 获取连接
            Connection conn = getConnection();
            // 开启事务
            conn.setAutoCommit(false);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static void commit() {
        try {
            Connection conn = tol.get();
            if (conn != null) {
                conn.commit();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void rollback() {
        try {
            // 从集合tol中得到一个连接
            Connection conn = tol.get();
            if (conn != null) {
                conn.rollback();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}
