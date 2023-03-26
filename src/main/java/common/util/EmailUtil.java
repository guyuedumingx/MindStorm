package common.util;

import common.dto.StatusCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.Project;
import javax.mail.*;
import javax.mail.internet.*;
import java.io.InputStream;
import java.util.Properties;

/**
 * 发送email
 * @author yohoyes
 */
public class EmailUtil {
    /**
     * 发送者邮箱
     */
    static String from = "";
    /**
     * 发送者的密钥
     */
    static String password = "";
    static Logger logger = LoggerFactory.getLogger(EmailUtil.class);

    static {
        try {
            Properties pro = new Properties();
            InputStream is = EmailUtil.class.getClassLoader().getResourceAsStream("email.properties");
            pro.load(is);
            from = pro.getProperty("sender");
            password = pro.getProperty("password");
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    /**
     * 对外暴露的发送接口，负责根据sendFor参数分发不同的邮件发送请求
     * register是注册时的验证码请求
     * chpwd是修改密码时的验证码请求
     * @param sendFor 邮件请求类型
     * @param to 接受者邮箱地址
     * @param code 验证码
     * @return
     */
    public static int send(String sendFor, String to, String code){
        if("register".equals(sendFor)){
            return sendRegisterEmail(to,code);
        }else if("chpwd".equals(sendFor)){
            return sendChPasswordEmail(to, code);
        }
        return StatusCode.LOST;
    }

    /**
     *负责发送邮件
     * 考虑到阿里云服务器禁止25号邮箱默认的发送端口,本方法改用465号端口发送邮件
     * 使用ssl加密
     * 邮件的内容content 支持HTML
     * @param to 接收者邮箱地址
     * @param head 邮件标题
     * @param content 邮件内容
     * @return
     */
    private static int sendEmail(String to,String head,String content) {
        Properties props = new Properties();

        //网易的smtp服务器地址
        props.put("mail.smtp.host", "smtp.163.com");
        props.setProperty("mail.transport.protocol", "smtp");
        props.put("mail.smtp.starttls.enable", false);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", true);
        props.put("mail.smtp.port", "465");


        Session session = Session.getInstance(props);

        Message msg = new MimeMessage(session);
        Transport transport = null;
        try {
            //设置邮件头
            msg.setSubject(head);
            // 设置邮件内容
            msg.setSubject(head);
            // 发送 HTML 消息, 可以插入html标签
            msg.setContent(content,"text/html;charset=gbk" );
            // 设置发件人
            String nick=javax.mail.internet.MimeUtility.encodeText("思维风暴");
            msg.setFrom(new InternetAddress(nick+" <"+from+">"));

            transport = session.getTransport();
            transport.connect(from,password);
            transport.sendMessage(msg, new Address[]{new InternetAddress(to)});
            return StatusCode.OK;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return StatusCode.ERROR;
        }finally {
            try {
                if (transport != null) {
                    transport.close();
                }
            }catch (MessagingException e) {
                logger.error(e.getMessage());
            }
        }
    }

    /**
     * 注册时发送验证码
     * @param to
     * @param code
     * @return
     */
    public static int sendRegisterEmail(String to, String code){
        String content = "<style type=\"text/css\">\n" +
                "* {\n" +
                "margin: 0;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "    <div style=\"position: relative;max-width: 400px;margin: 20px auto;border: 1.5px solid #e0f3f0;padding: 5px;overflow:hidden;\">\n" +
                "        <div style=\"position: absolute;top: 0px;left: 0px;width: 100%;height: 120%;background-image: url(http://8.129.110.151/img/logo.png);background-size: 80%;background-repeat: no-repeat;background-position: center 12px;opacity: 0.1;pointer-events: none;\"></div>\n" +
                "        <div style=\"padding: 5px 20px;background-color: #f3f7f5;\"><img style=\"display: inline-block;width: 22px;vertical-align: middle;\"\n" +
                "                src=\"http://8.129.110.151/img/logo.png\">\n" +
                "            <b style=\"display: inline-block;margin-left: -5px;font-size: 12px;color: #057082;vertical-align: middle;\">思维风暴</b>\n" +
                "        </div>\n" +
                "        <h4 style=\"padding: 5px 20px;font-size: 32px;color: #057082;\">验证您的邮箱注册地址</h4>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">感谢您注册思维风暴</p>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">以下是您的邮箱注册验证码，请将它输入到 思维风暴 的邮箱验证码输入框中:</p>\n" +
                "        <span style=\"display: block;padding: 5px 20px;margin-top: 30px;margin-bottom: 10px;font-size: 28px;font-weight: 700;text-align: center;text-decoration: underline;color: #057082;background-color: #f3f7f5;\">"+code+"</span>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">这一封邮件包括一些您的私密的 思维风暴 账号信息，请不要回复或转发它，以免带来不必要的信息泄露风险。</p>\n" +
                "        <h6 style=\"padding: 5px 20px;margin-bottom: 30px;font-size: 8px;font-weight: 400;text-align: center;color: #999;\">广东金融学院————绝不互相甩锅队</h6>\n" +
                "    </div>";
        return sendEmail(to, "欢迎使用思维风暴,更多新技能等你探索",content);
    }

    /**
     * 修改密码时发送验证码
     * @param to
     * @param code
     * @return
     */
    public static int sendChPasswordEmail(String to, String code) {
        String content = "<style type=\"text/css\">\n" +
                "* {\n" +
                "margin: 0;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "    <div style=\"position: relative;max-width: 400px;margin: 20px auto;border: 1.5px solid #e0f3f0;padding: 5px;overflow:hidden\">\n" +
                "        <div style=\"position: absolute;top: 0px;left: 0px;width: 100%;height: 120%;background-image: url(http://8.129.110.151/img/logo.png);background-size: 80%;background-repeat: no-repeat;background-position: center 12px;opacity: 0.1;pointer-events: none;\"></div>\n" +
                "        <div style=\"padding: 5px 20px;background-color: #f3f7f5;\"><img style=\"display: inline-block;width: 22px;vertical-align: middle;\"\n" +
                "                src=\"http://8.129.110.151/img/logo.png\">\n" +
                "            <b style=\"display: inline-block;margin-left: -5px;font-size: 12px;color: #057082;vertical-align: middle;\">思维风暴</b>\n" +
                "        </div>\n" +
                "        <h4 style=\"padding: 5px 20px;font-size: 22px;color: #057082;\">您正在修改 思维风暴 的密码</h4>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">请确保是您本人操作</p>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">以下是您的验证码，请将它输入到 思维风暴 的邮箱验证码输入框中:</p>\n" +
                "        <span style=\"display: block;padding: 5px 20px;margin-top: 30px;margin-bottom: 10px;font-size: 28px;font-weight: 700;text-align: center;text-decoration: underline;color: #057082;background-color: #f3f7f5;\">"+code+"</span>\n" +
                "        <p style=\"padding: 5px 20px;margin-bottom: 12px;font-size: 12px;\">这一封邮件包括一些您的私密的 思维风暴 账号信息，请不要回复或转发它，以免带来不必要的信息泄露风险。</p>\n" +
                "        <h6 style=\"padding: 5px 20px;margin-bottom: 30px;font-size: 8px;font-weight: 400;text-align: center;color: #999;\">广东金融学院————绝不互相甩锅队</h6>\n" +
                "    </div>";
        return sendEmail(to, "修改密码",content);
    }

    /**
     * 项目到期时发送提醒邮箱
     * @param to
     * @param project
     * @return
     */
    public static int sendEmailForDeadline(String to, Project project){
        String content = "<style type=\"text/css\">\n" +
                "* {\n" +
                "margin: 0;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "    <div style=\"position: relative;max-width: 400px;margin: 20px auto;border: 1.5px solid #e0f3f0;padding: 5px;overflow:hidden\">\n" +
                "        <div style=\"position: absolute;top: 0px;left: 0px;width: 100%;height: 120%;background-image: url(http://8.129.110.151/img/logo.png);background-size: 80%;background-repeat: no-repeat;background-position: center 12px;opacity: 0.1;pointer-events: none;\"></div>\n" +
                "        <div style=\"padding: 5px 20px;background-color: #f3f7f5;\"><img style=\"display: inline-block;width: 22px;vertical-align: middle;\"\n" +
                "                src=\"http://8.129.110.151/img/logo.png\">\n" +
                "            <b style=\"display: inline-block;margin-left: -5px;font-size: 12px;color: #057082;vertical-align: middle;\">思维风暴</b>\n" +
                "        </div>\n" +
                "        <h5 style=\"font-size: 22px;color: #057082;\">您的项目: </h5>" +
                "        <h4 style=\"font-size: 22px;color: #057082;\">"+project.getName()+"</h4>" +
                "        <p style=\"padding: 3px 20px;margin-bottom: 12px;font-size: 12px;\">即将在 "+project.getDeadline()+" 时到期,请您注意过期时间!</p>\n" +
                "        <p style=\"padding: 3px 20px;margin-bottom: 12px;font-size: 12px;\">这一封邮件包括一些您的私密的 思维风暴 账号信息，请不要回复或转发它，以免带来不必要的信息泄露风险。</p>\n" +
                "        <h6 style=\"padding: 5px 20px;margin-bottom: 30px;font-size: 8px;font-weight: 400;text-align: center;color: #999;\">广东金融学院————绝不互相甩锅队</h6>\n" +
                "    </div>";
        return sendEmail(to, "项目即将到期",content);
    }
}
