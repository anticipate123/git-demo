#include<stdio.h>//做得更好了 
#include<windows.h>
int main()
{
	int i, j, n;
	printf("Please input a integer:");
	scanf("%d",&n);//添加了注释 
	for(i=0;i<n;i++)
	{//添加了注释 
		for(j=1;j<n-i;j++)
		printf(" ");
		for(j=0;j<2*i+1;j++)//添加了注释 
		printf("*");//添加了注释 
		printf("\n");
	}
	for(i=n-2;i>=0;i--)//添加了注释 
	{
		for(j=1;j<n-i;j++)
		printf(" ");
		for(j=0;j<2*i+1;j++)
		printf("*");
		printf("\n");
	}
	return 0; 
/*	
	for(i=1;i<n;i++)
	{
		for(j=0;j<i;j++)
		printf(" ");
		for(j=0;j<2*n-1-2*i;j++)
		printf("*");
		printf("\n");
	}
*/
//	system("pause");
}
