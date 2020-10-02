package pojo;

import common.annontation.DbField;

import java.util.Date;

/**
 * 节点类
 * @author yohoyes
 */
public class Node extends BaseModel{
   @DbField("author")
   private int author;
   @DbField("star")
   private int star;
   @DbField("lastEditId")
   private int lastEditId;
   @DbField("children")
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
   @DbField("lastEditTime")
   private String lastEditTime = new Date().toString();

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
}
