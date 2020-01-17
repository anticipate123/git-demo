#include<stdio.h>
#include<windows.h>
int main()
{
	int i, j, n;
	printf("Please input a integer:");
	scan
	for(i=n-2;i>=0;i--)
	{
		for(j=1;j<n-i;j++)
		printf(" ");
		for(j=0;j<2*i+1;j++)
		printf("*");
		printf("\n");
	}
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
