package pojo;

import common.annontation.DbField;

/**
 * 节点类
 * @author yohoyes
 */
public class Node extends BaseModel{
   @DbField("author_id")
   private int author;
   @DbField("project_id")
   private int projectId;
   private int star;
   @DbField("last_edit_id")
   private int lastEditId;
   private int[] children;
   @DbField("parent_id")
   private int parentId;
   @DbField("editable")
   private boolean editable;
   @DbField("nameless")
   private boolean nameless;
   @DbField("theme")
   private String theme = "";
   @DbField("content")
   private String content = "请输入内容";
   @DbField("last_edit_time")
   private String lastEditTime = "";

   public Node(Project project){
      this.author = project.getAuthor();
      this.lastEditId = author;
      this.editable = false;
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

   public Node(int author, int lastEditId, int parentId, boolean editable, boolean nameless, String theme, String content) {
      this.author = author;
      this.lastEditId = lastEditId;
      this.parentId = parentId;
      this.editable = editable;
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

   public int getStar() {
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

   public boolean isEditable() {
      return editable;
   }

   public void setEditable(boolean editable) {
      this.editable = editable;
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
}
