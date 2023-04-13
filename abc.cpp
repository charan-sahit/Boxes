#include <bits/stdc++.h>
// import headers to save data in text file
#include <fstream>
#include <iostream>

// import headers to read data from text file

using namespace std;

struct node {
    int idx;
    int area;
    vector<struct node*> children;
} node;

bool overlapped(vector<float> a, vector<float> b) {

    // complete overlap

    // if (a[0] >= b[0] && a[2] <= b[2] && a[1] >= b[1] && a[3] <= b[3]) {
    //     return true;
    // }
    // return false;

    // partial overlap, if center of a is in b

    // int a_center_x = (a[0] + a[2]) / 2;
    // int a_center_y = (a[1] + a[3]) / 2;

    // if(a_center_x >= b[0] && a_center_x <= b[2] && a_center_y >= b[1] && a_center_y <= b[3]) {
    //     return true;
    // }

    //*************
    // AREA *************
    //*************


    int area1 = abs(a[0] - a[2]) 
      * abs(a[1] - a[3]);
  
    // Area of 2nd Rectangle
    int area2 = abs(b[0] - b[2]) 
      * abs(b[1] - b[3]);
  
    // Length of intersecting part i.e
    // start from max(a[0], a[2]) of
    // x-coordinate and end at min(b[0],
    // b[2]) x-coordinate by subtracting
    // start from end we get required
    // lengths
    int x_dist = min(b[0], b[2]) 
                  - max(a[0], a[2]);
    int y_dist = (min(b[1], b[3]) 
                  - max(a[1], a[3]));
    int areaI = 0;
    if( x_dist > 0 && y_dist > 0 )
    {
        areaI = x_dist * y_dist;
    }
      
    if(area1 == 0)
        return false;
    return (area1 + area2 - areaI)/area1 > 0.4;
}


void dfs(struct node* root, struct node* temp, vector<vector<float>> boxes,int* status)
{
    if(root->children.size() == 0 && *status==0)
    {
        root->children.push_back(temp);
        *status=1;
        return;
    }

    for(auto child: root->children)
    {
        // printf("%d %d %d %d %d %d %d %d", boxes[temp->idx][0], boxes[child->idx][0], boxes[temp->idx][1], boxes[child->idx][1], boxes[temp->idx][2], boxes[child->idx][2], boxes[temp->idx][3], boxes[child->idx][3]);
        if(overlapped(boxes[temp->idx], boxes[child->idx]))
        {
            dfs(child, temp, boxes, status);
        }
        // if(boxes[temp->idx][0] >= boxes[child->idx][0] && boxes[temp->idx][1] >= boxes[child->idx][1] && boxes[temp->idx][2] <= boxes[child->idx][2] && boxes[temp->idx][3] <= boxes[child->idx][3])
        // {
        //     cout << "here" << endl;
        //     dfs(child, temp, boxes, status);
        // }
    }

    if(*status==0)
    {
        *status=1;
        root->children.push_back(temp);
    }

    return;
}

int main()
{
    fstream newfile;
     vector<vector<float>> boxes;
    newfile.open("output.txt",ios::in); //open a file to perform read operation using file object
   if (newfile.is_open()){   //checking whether the file is open
      string tp;
      while(getline(newfile, tp)){  
        stringstream ss(tp);
        vector<float> vec(4);
        for(int i = 0; i < 4; i++) {
            ss >> vec[i];
            
        }
        boxes.push_back(vec);

        //  cout << tp << "\n";   //print the data of the string
      }
      newfile.close();   //close the file object.
   }

    vector<struct node*> tree;
    for(int i = 0; i < boxes.size(); i++)
    {
        struct node* temp = new struct node;
        temp->idx = i;
        temp->area = (boxes[i][2] - boxes[i][0]) * (boxes[i][3] - boxes[i][1]);
        tree.push_back(temp);
    }

    // sort the tree vector based on area
    sort(tree.begin(), tree.end(), [](struct node* a, struct node* b) {
        return a->area > b->area;
    });

    ofstream myfile;
    myfile.open ("example.txt");

    // ********
    // MAX ****
    // ********


    // store the sorted vector coordinates in a file
    for (auto box : tree)
    {
        // print area
        // cout << (box[2] - box[0]) * (box[3] - box[1]) << " ";
        // cout << endl;
        myfile << boxes[box->idx][0] << " " << boxes[box->idx][1] << " " << boxes[box->idx][2] << " " << boxes[box->idx][3] << endl;
    }


    // print the sorted vector
    // for (auto box : boxes)
    // {
    //     // print area
    //     cout << (box[2] - box[0]) * (box[3] - box[1]) << " ";
    //     cout << endl;
    // }

    // create root
    struct node* root = new struct node;
    root->idx = -1;
    root->area = -1;

    // add the first box to the tree

    struct node* temp = tree[0];
    root->children.push_back(temp);

    for(int i = 1; i < boxes.size(); i++)
    {
        // create a node
        struct node* temp = tree[i];
        
        // traverse the tree in dfs to find the non overlapping box
        int status = 0;
        dfs(root, temp, boxes, &status);

    }

    
    
    // draw the tree from the root usin bfs, and store them in a file

    // bfs********

    

    queue<struct node*> q;
    q.push(root);

    while(!q.empty())
    {
        struct node* temp = q.front();
        q.pop();

        if(temp->idx != -1)
        {
            // myfile << temp->idx << " ";
            // for the index, print the coordinates
            // myfile << boxes[temp->idx][0] << " " << boxes[temp->idx][1] << " " << boxes[temp->idx][2] << " " << boxes[temp->idx][3] << endl;
        }

        for(int i = 0; i < temp->children.size(); i++)
        {
            q.push(temp->children[i]);
        }
    }


    //dfs************
    // stack<struct node*> s;
    // s.push(root);

    // while(!s.empty())
    // {
    //     struct node* temp = s.top();
    //     s.pop();

    //     if(temp->idx != -1)
    //     {
    //         // myfile << temp->idx << " ";
    //         // for the index, print the coordinates
    //         myfile << boxes[temp->idx][0] << " " << boxes[temp->idx][1] << " " << boxes[temp->idx][2] << " " << boxes[temp->idx][3] << endl;
    //     }

    //     for(int i = temp->children.size() - 1; i >= 0; i--)
    //     {
    //         s.push(temp->children[i]);
    //     }
    // }

    myfile.close();

    return 0;



    

    

    




  

}