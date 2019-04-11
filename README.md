# eibsExpand
create table OUL
(
  id_          NUMBER(20) not null,
  inr          NUMBER(20),
  customercode VARCHAR2(9),
  creditcode   VARCHAR2(18),
  state        VARCHAR2(1),
  effectdate   DATE,
  filename_    VARCHAR2(50),
  create_by    NUMBER(20),
  create_time  DATE,
  update_by    NUMBER(20),
  update_time  DATE,
  remark_      VARCHAR2(255),
  enable_      NUMBER(1)
);

JDK1.6; 框架涉及 spring-springMVC-mybatis,mybai-plus,maven;

使用mvn中的tomcat插件运行:
command line: clean package tomcat7:run-war -Dmaven.test.skip=true

