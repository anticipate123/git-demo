#include<stdio.h>//���ø����� 
#include<windows.h>
int main()
{
	int i, j, n;
	printf("Please input a integer:");
	scanf("%d",&n);//�����ע�� 
	for(i=0;i<n;i++)
	{//�����ע�� 
		for(j=1;j<n-i;j++)
		printf(" ");
		for(j=0;j<2*i+1;j++)//�����ע�� 
		printf("*");//�����ע�� 
		printf("\n");
	}
	for(i=n-2;i>=0;i--)//�����ע�� 
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
