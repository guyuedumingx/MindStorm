package pojo;

import common.annontation.DbField;

/**
 * 节点类
 * @author yohoyes
 */
public class Node extends BaseModel{
   @DbField(value = "author_id",update = false)
   private int author;
   @DbField(value = "project_id",update = false)
   private int projectId;
   @DbField(value = "star",insertIgnore = true,update = false)
   private long star;
   private String lastEditName = "";
   private String userName = "";
   private boolean isStared;
   @DbField(value = "last_edit_id")
   private int lastEditId;
   private int[] children;
   @DbField(value = "parent_id",update = false)
   private int parentId;
   @DbField(value = "banAppend")
   private boolean banAppend = false;
   @DbField(value = "nameless",update = false)
   private boolean nameless;
   @DbField(value = "theme")
   private String theme = "";
   @DbField(value = "content")
   private String content = "请输入内容";
   @DbField(value = "last_edit_time",update = false)
   private String lastEditTime = "";

   public Node(Project project){
      this.author = project.getAuthor();
      this.lastEditId = author;
      this.banAppend = false;
      this.nameless = false;
      this.projectId = project.getId();
      this.theme = project.getName();
      this.content = project.getIntroduction();
   }

   public Node() {
   }
   public Node(int id) {
      this.id = id;
   }

   public Node(int author, int lastEditId, int parentId, boolean banAppend, boolean nameless, String theme, String content) {
      this.author = author;
      this.lastEditId = lastEditId;
      this.parentId = parentId;
      this.banAppend = banAppend;
      this.nameless = nameless;
      this.theme = theme;
      this.content = content;
   }

   public int getAuthor() {
      return author;
   }

   public void setAuthor(int author) {
      this.author = author;
   }

   public long getStar() {
      return star;
   }

   public void setStar(int star) {
      this.star = star;
   }

   public int getLastEditId() {
      return lastEditId;
   }

   public void setLastEditId(int lastEditId) {
      this.lastEditId = lastEditId;
   }

   public int[] getChildren() {
      return children;
   }

   public void setChildren(int[] children) {
      this.children = children;
   }

   public boolean isBanAppend() {
      return banAppend;
   }

   public void setBanAppend(boolean banAppend) {
      this.banAppend = banAppend;
   }

   public boolean isNameless() {
      return nameless;
   }

   public void setNameless(boolean nameless) {
      this.nameless = nameless;
   }

   public String getTheme() {
      return theme;
   }

   public void setTheme(String theme) {
      this.theme = theme;
   }

   public String getContent() {
      return content;
   }

   public void setContent(String content) {
      this.content = content;
   }

   public String getLastEditTime() {
      return lastEditTime;
   }

   public void setLastEditTime(String lastEditTime) {
      this.lastEditTime = lastEditTime;
   }

   public int getParentId() {
      return parentId;
   }

   public void setParentId(int parentId) {
      this.parentId = parentId;
   }

   public int getProjectId() {
      return projectId;
   }

   public void setProjectId(int projectId) {
      this.projectId = projectId;
   }

   public void setStar(long star) {
      this.star = star;
   }

   public boolean isStared() {
      return isStared;
   }

   public void setStared(boolean stared) {
      isStared = stared;
   }

   public String getLastEditName() {
      return lastEditName;
   }

   public void setLastEditName(String lastEditName) {
      this.lastEditName = lastEditName;
   }

   public String getUserName() {
      return userName;
   }

   public void setUserName(String userName) {
      this.userName = userName;
   }
}
