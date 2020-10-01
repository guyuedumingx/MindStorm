package pojo;

import common.annontation.DbField;
import common.annontation.DbFieldId;

import java.util.Date;

/**
 * 节点类
 * @author yohoyes
 */
public class Node {
   @DbFieldId
   @DbField("node_id")
   private int nodeId;
   @DbField("author")
   private int author;
   @DbField("star")
   private int star;
   @DbField("last_edit_user_id")
   private int lastEditUserId;
   @DbField("children")
   private int[] children;
   @DbField("editable")
   private boolean editable;
   @DbField("nameless")
   private boolean nameless;
   @DbField("theme")
   private String theme = "";
   @DbField("content")
   private String content = "请输入内容";
   @DbField("last_edit_time")
   private String lastEditTime = new Date().toString();

   public int getAuthor() {
      return author;
   }

   public void setAuthor(int author) {
      this.author = author;
   }

   public int getNodeId() {
      return nodeId;
   }

   public void setNodeId(int nodeId) {
      this.nodeId = nodeId;
   }

   public int getStar() {
      return star;
   }

   public void setStar(int star) {
      this.star = star;
   }

   public int getLastEditUserId() {
      return lastEditUserId;
   }

   public void setLastEditUserId(int lastEditUserId) {
      this.lastEditUserId = lastEditUserId;
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
}
