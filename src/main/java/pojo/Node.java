package pojo;

/**
 * 节点类
 */
public class Node {
   private int author;
   private int nodeId;
   private int star;
   private int lastEditUserId;
   private int[] children;
   private boolean editable;
   private boolean nameless;
   private String theme;
   private String content;
   private String lastEditTime;

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
