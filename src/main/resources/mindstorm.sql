CREATE DATABASE mindstorm  CHARACTER SET utf8;
USE mindstorm;
CREATE TABLE t_user (
                        id INT(11) PRIMARY KEY AUTO_INCREMENT,
                        EXP INT(11),
                        token VARCHAR(128),
                        user_name VARCHAR(128),
                        PASSWORD VARCHAR(128),
                        user_avatar TEXT,
                        user_email varchar(256),
                        user_signature VARCHAR(128)
);

CREATE TABLE t_project (
                           id INT(11) PRIMARY KEY AUTO_INCREMENT,
                           project_rank INT(10),
                           author_id INT(11),
                           head_id INT(11),
                           public BOOLEAN,
                           introduction TEXT,
                           project_name VARCHAR(128),
                           create_time Varchar(128),
                           deadline VARCHAR(128),
                           PASSWORD VARCHAR(128)
);

CREATE TABLE t_node (
                        id INT(11) PRIMARY KEY AUTO_INCREMENT,
                        author_id INT(11),
                        project_id INT(11),
                        star INT(11),
                        last_edit_id INT(11),
                        parent_id INT(11),
                        banAppend BOOLEAN,
                        nameless BOOLEAN,
                        theme VARCHAR(128),
                        content TEXT,
                        last_edit_time VARCHAR(128)
);

CREATE TABLE t_star (
                        user_id INT(11) NOT NULL,
                        node_id INT(11) NOT NULL
);

CREATE TABLE t_recent_project (
                                  user_id INT(11) NOT NULL,
                                  project_id INT(11) NOT NULL
);

CREATE TABLE t_edit (
                        user_id INT(11) NOT NULL,
                        node_id INT(11) NOT NULL,
                        edit_type VARCHAR(16),
                        edit_time VARCHAR(128)
);

CREATE TABLE t_follow (
                          follower_id INT(11) NOT NULL,
                          following_id INT(11) NOT NULL
);

CREATE TABLE t_contributor (
                               project_id INT(11) NOT NULL,
                               contributor_id INT(11) NOT NULL
);
